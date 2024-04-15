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
        tbm: "youchat"
      });
      popToRoot();
      open(`https://you.com/search?${params}`);
    },
    initialValues: {
      query: props.draftValues?.query ?? props.fallbackText ?? "",
      chatMode: props.draftValues?.chatMode ?? "default",
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
        title="Chat Mode"
        info="Select your chat mode"
        {...itemProps.chatMode}
      >
        <Form.Dropdown.Item value="default" title="Smart - Quickly complete tasks, create content, access news & live web results" />
        <Form.Dropdown.Item value="agent" title="⚡️Genius - Solutions to complex problems that require multiple steps" />
        <Form.Dropdown.Item value="custom" title="⚡️Enhanced - Advanced You.com capabilities with a custom AI model" />
        <Form.Dropdown.Item value="research" title="⚡️Research - Analysis, comparisons, and topic exploration with extensive citations" />
        <Form.Dropdown.Item value="create" title="⚡️Create - Transform ideas into stunning visuals with unlimited styles" />
      </Form.Dropdown>
      <Form.Separator />
			<Form.Description text="YouPro: https://you.com/plans" />
			<Form.Description text="YouChat: https://about.you.com/youchat/" />
			<Form.Description text="FAQ: https://about.you.com/faq/" />
    </Form>
  );
}
