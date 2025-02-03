import { SubmitButton } from "./submitButton.styles";

export default function SubmitButtonComponent({ text }: { text: string }) {
    return <SubmitButton type="submit">{text}</SubmitButton>;
}
