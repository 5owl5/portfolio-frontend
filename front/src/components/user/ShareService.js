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
import kakaoLogo from'../../images/kakao.png'


const FlexContainer= styled.div`
        display: flex;
        flex-direction: column
        align-items: center;
`;

const GridContainer= styled.div`
        display: grid;
        grid-template-columns: repeat(4,48px);
        grid-column-gap: 8px;
        justify-content: center;
        align-items: center;
        margin-bottom:16px
`;
const URLShareButton = styled.button`
	width: 48px;
	height: 48px;
	color: white;
	border-radius: 24px;
	border: 0px;
	font-weight: 800;
	font-size: 16px;
	cursor: pointer;
	background-color: #7362ff;
	&:hover {
		background-color: #a99fee;
	}
`;
const KakaoShareButton= styled.a`
		cursor: pointer;
		`;
const KakaoIcon= styled.img`
		width:48px;
		height: 48px;
		border-radius:24px;
		`;



const ShareService=()=>{
    const currentUrl = window.location.href;
    const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");
    useEffect(() => {
		if (status === "ready" && window.Kakao) {
			// 중복 initialization 방지
			if (!window.Kakao.isInitialized()) {
				// 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
				window.Kakao.init("60c3724d61a668efe414c664d3ab233d");
			}
		}
	}, [status]);	
    const shareKakaoLink = (userId) => {
        window.Kakao.Link.createCustomButton({
			container: '#kakao-link-btn',
			templateId: 82204,
			templateArgs: {
				userId: `${userId}`,
			},
		});
    };
	const onShareKakaoClick=()=>{
		shareKakaoLink('60c3724d61a668efe414c664d3ab233d')
	}

	return (
		<FlexContainer>
			<GridContainer>
				<FacebookShareButton  url={currentUrl}>
					<FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
				</FacebookShareButton>
				<TwitterShareButton url={currentUrl}>
					<TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
				</TwitterShareButton>
                <CopyToClipboard text={currentUrl}>
				<URLShareButton>URL</URLShareButton>
                </CopyToClipboard>
				<KakaoShareButton id='kakao-link-btn'  onClick={onShareKakaoClick}  >
					<KakaoIcon src={kakaoLogo} size={48} round={true} borderRadius={24}/>
				</KakaoShareButton>
			</GridContainer>
		</FlexContainer>
	);
}

export default ShareService;

