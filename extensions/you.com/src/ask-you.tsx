import {
  Action,
  ActionPanel,
  Form,
  LaunchProps,
  getPreferenceValues,
  open,
  popToRoot,
} from "@raycast/api";
import { useForm } from "@raycast/utils";

type Values = {
  query: string;
  chatMode: string;
};

export default function Command(
  props: LaunchProps<{ draftValues: Values; arguments: Arguments.AskYou }>,
) {
  const { handleSubmit, itemProps } = useForm<Values>({
    onSubmit({ query, chatMode }) {
      const params = new URLSearchParams({
        q: query,
        chatMode,
      });
      popToRoot();
      open(`https://you.com/search?${params}&fromSearchBar=true&tbm=youchat`);
    },
    initialValues: {
      query: props.draftValues?.query ?? props.fallbackText ?? "",
      chatMode: props.draftValues?.chatMode ?? "all",
    },
    validation: {
      query: (value) =>
        value && value.length > 0 ? null : "Query cannot be empty",
    },
  });

  if (props.arguments.query) {
    handleSubmit({
      query: props.arguments.query,
      chatMode: "default",
    });
    return null;
  }

  if (props.fallbackText) {
    handleSubmit({
      query: props.fallbackText,
      chatMode: "default",
    });
    return null;
  }

  return (
    <Form
      enableDrafts
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="You.com" />
      <Form.TextArea title="Ask Anything" {...itemProps.query} />
      <Form.Dropdown
        title="ChatMode"
        info="Select your chat mode"
        {...itemProps.chatMode}
      >
        <Form.Dropdown.Item value="default" title="Smart" />
        <Form.Dropdown.Item value="agent" title="Genius" />
        <Form.Dropdown.Item value="custom" title="Enhanced" />
        <Form.Dropdown.Item value="research" title="Research" />
        <Form.Dropdown.Item value="create" title="Create" />
      </Form.Dropdown>
      <Form.Separator />
    </Form>
  );
}
