import * as PC from "./party.styles";

const PartyButton = ({ text }: { text: string }) => {
    return (
        <PC.Container>
            <PC.H4>{text}</PC.H4>
            <PC.Img src="/images/right_arrow.svg" alt="right_arrow" />
        </PC.Container>
    );
};

export default PartyButton;
