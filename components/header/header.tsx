import { Header, Logo, Title } from "./header.style";

export default function HeaderComponent({
    logoSrc,
    title,
}: {
    logoSrc?: string;
    title?: string;
}) {
    return (
        <Header>
            {logoSrc && <Logo src={logoSrc} alt="logo" />}
            {title && <Title>{title}</Title>}
        </Header>
    );
}
