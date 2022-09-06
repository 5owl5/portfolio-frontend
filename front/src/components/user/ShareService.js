import styled from "styled-components";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useScript } from "./Hooks";
import { useEffect } from "react";
import kakaoLogo from "../../images/kakao.png";

const shareKakaoLink = (userId) => {
  window.Kakao.Link.createCustomButton({
    container: "#kakao-link-btn",
    templateId: 82204,
    templateArgs: {
      userId: `${userId}`,
    },
  });
};

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GridContainer = styled.div`
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(4, 48px);
  grid-column-gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
  & button:hover {
    opacity: 0.5;
    scale: 120%;
  }
`;
const URLShareButton = styled.button`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  color: white;
  border-radius: 24px;
  border: 0px;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
  background-color: #7362ff;
  &:hover {
    background-color: #a99fee;
    scale: 120%;
  }
`;
const KakaoShareButton = styled.a`
  cursor: pointer;
  &:hover {
    opacity: 50%;
    scale: 120%;
  }
`;
const KakaoIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 24px;
`;

const ShareService = () => {
  const currentUrl = window.location.href;
  const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");
  useEffect(() => {
    if (status === "ready" && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("60c3724d61a668efe414c664d3ab233d");
      }

      shareKakaoLink("60c3724d61a668efe414c664d3ab233d");
    }
  }, [status]);

  return (
    <FlexContainer>
      <GridContainer>
        <FacebookShareButton url={currentUrl}>
          <FacebookIcon size={40} round={true} borderRadius={24}></FacebookIcon>
        </FacebookShareButton>
        <TwitterShareButton url={currentUrl}>
          <TwitterIcon size={40} round={true} borderRadius={24}></TwitterIcon>
        </TwitterShareButton>
        <CopyToClipboard text={currentUrl}>
          <URLShareButton>URL</URLShareButton>
        </CopyToClipboard>
        <KakaoShareButton id="kakao-link-btn">
          <KakaoIcon src={kakaoLogo} size={40} round={true} borderRadius={24} />
        </KakaoShareButton>
      </GridContainer>
    </FlexContainer>
  );
};

export default ShareService;
