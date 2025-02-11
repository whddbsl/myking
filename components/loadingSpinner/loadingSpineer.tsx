import { SyncLoader } from "react-spinners";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const LoadingSpinner = () => {
    return (
        <SpinnerWrapper>
            <SyncLoader color="#269386" />
        </SpinnerWrapper>
    );
};

export default LoadingSpinner;
