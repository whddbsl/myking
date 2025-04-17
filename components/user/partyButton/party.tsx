import { useRouter } from "next/navigation";
import * as PC from "./party.styles";

interface PartyButtonProps {
    text: string;
    route: string;
}

const PartyButton: React.FC<PartyButtonProps> = ({ text, route }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(route);
    };

    return (
        <PC.Container onClick={handleClick}>
            <PC.H4>{text}</PC.H4>
            <PC.Img src="/images/right_arrow.svg" alt="right_arrow" />
        </PC.Container>
    );
};

export default PartyButton;
