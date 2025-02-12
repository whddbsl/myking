import { SyncLoader } from "react-spinners";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5); // 반투명 배경
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999; // 화면 위에 표시
`;

const LoadingSpinner = () => {
    return (
        <LoadingOverlay>
            <SpinnerWrapper>
                <SyncLoader color="#269386" />
            </SpinnerWrapper>
        </LoadingOverlay>
    );
};

export default LoadingSpinner;
