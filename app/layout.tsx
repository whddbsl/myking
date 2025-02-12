"use client";

import AuthProvider from "@/context/AuthProvider";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Head from "next/head";
import BottomNav from "@/components/bottomNav/bottomNav";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  
  button {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-size: inherit; 
    line-height: inherit; 
    background: none; 
    border: none; 
    cursor: pointer; 
  }

  body {
    line-height: 1;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    background-color: #ededed; /* ★ 여기에 옅은 회색 설정 ★ */
  }

  main {
    padding: 16px;
  }

  ol, ul {
    list-style: none !important;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
  }
`;

const Container = styled.div`
    max-width: 500px;
    margin: 0 auto;
    min-height: 100vh;
    background-color: #fff;
`;

const BottomNavContainer = styled.div`
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
`;

const theme = {
    colors: {
        primary: "#269386",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const showBottomNav =
        !pathname.includes("/auth") &&
        !pathname.includes("/admin") &&
        !pathname.includes("/create");
    const applyContainer = !pathname.includes("/admin");
    return (
        <html lang="en">
            <head>
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="icon" href="/icons/app-icon-192x192.png" />
                </Head>
            </head>
            <body>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <AuthProvider>
                        {applyContainer ? (
                            <Container>{children}</Container>
                        ) : (
                            <>{children}</>
                        )}
                    </AuthProvider>
                </ThemeProvider>
                {showBottomNav && (
                    <footer>
                        <BottomNavContainer>
                            <BottomNav />
                        </BottomNavContainer>
                    </footer>
                )}
            </body>
        </html>
    );
}
