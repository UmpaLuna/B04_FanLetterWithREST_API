import styled from "styled-components";
import { BsInstagram, BsFacebook, BsYoutube, BsTwitter } from "react-icons/bs";

export const LayoutFoo = styled.footer`
  background-color: #06ace9;
`;
export const FooContainer = styled.div``;
export const FooNoticeContainer = styled.ul`
  padding: 3.4rem 2.6rem 2.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: #fff;
  line-height: 1.4;
  gap: 1rem;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
  flex-wrap : nowrap;
  gap: 10px;
  justify-content : space-between;
  max-width: 1366px;
  margin : 0 auto;
  `}
`;

export const FooNoticeItem = styled.li`
  color: ${(props) => props.color};
  font-weight: bold;
  font-size: ${(props) => props.fontSize || 14}px;
`;

export const FooBottom = styled.div`
  ${({ theme: { imgSrc } }) =>
    `background-image : url(${process.env.PUBLIC_URL + imgSrc.fooMb})`};
  background-repeat: repeat-x;
  ${({ theme: { mediaQuery } }) => mediaQuery.lg`

    ${({ theme: { imgSrc } }) =>
      `
      background-image : url(${process.env.PUBLIC_URL + imgSrc.fooPc})
    `}
  `}
`;
export const FooMain = styled.div`
  padding: 0 16px;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`
    max-width: 1366px;
    margin : 0 auto;
  `}
`;

export const FooLogoBox = styled.div`
  max-width: 280px;
  margin-top: 12px;
  ${({ theme: { mediaQuery } }) => mediaQuery.md`margin-top:24px`}
  ${({ theme: { mediaQuery } }) => mediaQuery.lg`margin-top:36px`}
`;

export const FooLogoImg = styled.img.attrs(({ theme: { imgSrc } }) => ({
  src: `${process.env.PUBLIC_URL + imgSrc.fooLogo}`,
}))`
  display: inline-block;
  width: 148px;
  height: 38px;
`;

export const FooAddr = styled.div`
  margin-top: 20px;
`;
export const FooAddrList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  line-height: 1.5;
  > :first-child {
    width: 100%;
  }
  ${({ theme: { mediaQuery } }) => mediaQuery.md`flex-wrap: nowrap;
  >:first-child {width: auto}`}
`;
export const FooAddrListItem = styled.li`
  margin-top: 2px;
  font-size: 1.2rem;
  position: relative;
  ${(props) =>
    props.$pseudo &&
    `
    margin-left: 8px;
    padding-left: 9px;
    &::before {
    content: "";
    display: block;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.3);
    top: 6px;
    left: 0px;
    width: 1px;
    height: 10px;
    }
  `}
`;
export const FooSpan = styled.span`
  color: ${(props) => (props.white && `#fff`) || `rgba(255, 255, 255, 0.6)`};
`;
export const FooStrong = styled.strong`
  color: #fff;
  text-decoration: ${(props) => props.$underline && `underline`};
  letter-spacing: -0.01rem;
`;

export const FooCopyRight = styled(FooAddr)`
  margin-top: 2.4rem;
  padding-bottom: 1rem;
`;
export const FooCopyParagraph = styled(FooSpan)`
  font-size: 1.4rem;
  color: #fff;
`;

export const FooMediaBox = styled(FooAddrList)`
  flex-wrap: nowrap;
  line-height: 1.3;
  & > :first-child {
    width: auto;
  }
  ${({ theme: { mediaQuery } }) => mediaQuery.lg`
    margin-top: 12px;
    gap: 0.4rem;
  `}
`;
export const FooSns = styled.li`
  padding: 0.8rem 0.6rem;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    transition: all 0.5s;
    color: #fff;
  }
`;

const snsLogo = [BsInstagram, BsFacebook, BsYoutube, BsTwitter];

export const FooLogoInstagram = styled(BsInstagram)`
  font-size: 24px;
`;
export const FooLogoFacebook = styled(BsFacebook)`
  font-size: 24px;
`;
export const FooLogoYoutube = styled(BsYoutube)`
  font-size: 24px;
`;
export const FooLogoTwitter = styled(BsTwitter)`
  font-size: 24px;
`;
