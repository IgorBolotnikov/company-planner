import React, {
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type DefaultValues,
  type FieldValues,
  FormProvider,
  type FormState,
  type KeepStateOptions,
  type Path,
  type RegisterOptions,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormHandleSubmit,
  type UseFormProps,
  type UseFormReturn,
  get,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  type FetcherWithComponents,
  type FormEncType,
  type FormMethod,
  type SubmitFunction,
  useActionData,
  useNavigation,
  useSubmit,
  useHref,
} from "react-router";

import { createFormData } from "./utilities";

export type SubmitFunctionOptions = Parameters<SubmitFunction>[1];

export interface UseRemixFormOptions<T extends FieldValues>
  extends UseFormProps<T> {
  submitHandlers?: {
    onValid?: SubmitHandler<T>;
    onInvalid?: SubmitErrorHandler<T>;
  };
  submitConfig?: SubmitFunctionOptions;
  submitData?: FieldValues;
  fetcher?: FetcherWithComponents<unknown>;
  /**
   * If true, all values will be stringified before being sent to the server, otherwise everything but strings will be stringified (default: true)
   */
  stringifyAllValues?: boolean;
}

export const useRemixForm = <T extends FieldValues>({
  submitHandlers,
  submitConfig,
  submitData,
  fetcher,
  stringifyAllValues = true,
  ...formProps
}: UseRemixFormOptions<T>) => {
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const basename = useHref("/");
  const actionSubmit = useSubmit();
  const actionData = useActionData();
  const submit = fetcher?.submit ?? actionSubmit;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const data: any = fetcher?.data ?? actionData;
  const methods = useForm<T>({ ...formProps, errors: data?.errors });
  const navigation = useNavigation();
  // Either it's submitted to an action or submitted to a fetcher (or neither)
  const isSubmittingForm = useMemo(
    () =>
      Boolean(
        (navigation.state !== "idle" && navigation.formData !== undefined) ||
          (fetcher?.state !== "idle" && fetcher?.formData !== undefined),
      ),
    [navigation.state, navigation.formData, fetcher?.state, fetcher?.formData],
  );

  // A state to keep track whether we're actually submitting the form through the network
  const [isSubmittingNetwork, setIsSubmittingNetwork] = useState(false);
  // When the network submission is done, set the state to `false`
  useEffect(() => {
    if (!isSubmittingForm) {
      setIsSubmittingNetwork(false);
    }
  }, [isSubmittingForm]);

  // Submits the data to the server when form is valid
  const onSubmit = useMemo(
    () =>
      (
        data: T,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        e: any,
        formEncType?: FormEncType,
        formMethod?: FormMethod,
        formAction?: string,
      ) => {
        setIsSubmittingNetwork(true);
        setIsSubmittedSuccessfully(true);
        const encType = submitConfig?.encType ?? formEncType;
        const method = submitConfig?.method ?? formMethod ?? "post";
        const action = submitConfig?.action ?? formAction;
        const submitPayload = { ...data, ...submitData };
        const formData =
          encType === "application/json"
            ? submitPayload
            : createFormData(submitPayload, stringifyAllValues);

        submit(formData, {
          ...submitConfig,
          method,
          encType,
          action,
        });
      },
    [submit, submitConfig, submitData, stringifyAllValues],
  );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onInvalid = useMemo(() => () => {}, []);

  // React-hook-form uses lazy property getters to avoid re-rendering when properties
  // that aren't being used change. Using getters here preservers that lazy behavior.
  const formState: FormState<T> = useMemo(
    () => ({
      get isDirty() {
        return methods.formState.isDirty;
      },
      get isLoading() {
        return methods.formState.isLoading;
      },
      get isSubmitted() {
        return methods.formState.isSubmitted;
      },
      get isSubmitSuccessful() {
        return isSubmittedSuccessfully || methods.formState.isSubmitSuccessful;
      },
      get isSubmitting() {
        return isSubmittingNetwork || methods.formState.isSubmitting;
      },
      get isValidating() {
        return methods.formState.isValidating;
      },
      get isValid() {
        return methods.formState.isValid;
      },
      get disabled() {
        return methods.formState.disabled;
      },
      get submitCount() {
        return methods.formState.submitCount;
      },
      get defaultValues() {
        return methods.formState.defaultValues;
      },
      get dirtyFields() {
        return methods.formState.dirtyFields;
      },
      get touchedFields() {
        return methods.formState.touchedFields;
      },
      get validatingFields() {
        return methods.formState.validatingFields;
      },
      get errors() {
        return methods.formState.errors;
      },
    }),
    [methods.formState, isSubmittedSuccessfully, isSubmittingNetwork],
  );
  const reset = useMemo(
    () =>
      (
        values?: T | DefaultValues<T> | undefined,
        options?: KeepStateOptions,
      ) => {
        setIsSubmittedSuccessfully(false);
        methods.reset(values, options);
      },
    [methods.reset],
  );

  const register = useMemo(
    () =>
      (
        name: Path<T>,
        options?: RegisterOptions<T> & {
          disableProgressiveEnhancement?: boolean;
        },
      ) => {
        const defaultValue =
          get(data?.defaultValues, name) ??
          get(methods.formState.defaultValues, name);
        return {
          ...methods.register(name, options),
          ...(!options?.disableProgressiveEnhancement && {
            defaultValue:
              typeof defaultValue === "string" ? defaultValue : undefined,
            defaultChecked:
              typeof defaultValue === "boolean" ? defaultValue : undefined,
          }),
        };
      },
    [methods.register, data?.defaultValues, methods.formState.defaultValues],
  );

  const handleSubmit = useMemo(
    () => (e?: FormEvent<HTMLFormElement>) => {
      const encType = e?.currentTarget?.enctype as FormEncType | undefined;
      const method = e?.currentTarget?.method as FormMethod | undefined;
      const action = e?.currentTarget?.action.replace(
        `${window.location.origin}${basename === "/" ? "" : basename}`,
        "",
      );

      const onValidHandler = submitHandlers?.onValid ?? onSubmit;
      const onInvalidHandler = submitHandlers?.onInvalid ?? onInvalid;

      return methods.handleSubmit(
        (data, e) => onValidHandler(data, e, encType, method, action),
        onInvalidHandler,
      )(e);
    },
    [methods.handleSubmit, submitHandlers, onSubmit, onInvalid],
  );

  const hookReturn = useMemo(
    () => ({
      ...methods,
      handleSubmit,
      reset,
      register,
      formState,
    }),
    [methods, handleSubmit, reset, register, formState],
  );

  return hookReturn;
};

export type UseRemixFormReturn = ReturnType<typeof useRemixForm>;

interface RemixFormProviderProps<T extends FieldValues>
  extends Omit<UseFormReturn<T>, "handleSubmit" | "reset"> {
  children: ReactNode;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  handleSubmit: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  register: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  reset: any;
}
export const RemixFormProvider = <T extends FieldValues>({
  children,
  ...props
}: RemixFormProviderProps<T>) => {
  return <FormProvider {...props}>{children}</FormProvider>;
};

export const useRemixFormContext = <T extends FieldValues>() => {
  const methods = useFormContext<T>();
  return {
    ...methods,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    handleSubmit: methods.handleSubmit as any as ReturnType<
      UseFormHandleSubmit<T>
    >,
  };
};
