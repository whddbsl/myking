import { BackButton, Header, Logo, Title } from "./header.style";

export default function HeaderComponent({
    logoSrc,
    title,
    showBackButton,
}: {
    logoSrc?: string;
    title?: string;
    showBackButton?: boolean;
}) {
    return (
        <Header>
            {showBackButton && (
                <BackButton
                    src="/images/back_button.svg"
                    onClick={() => window.history.back()}
                    alt="back_button"
                />
            )}
            {logoSrc && <Logo src={logoSrc} alt="logo" />}
            {title && <Title>{title}</Title>}
        </Header>
    );
}
