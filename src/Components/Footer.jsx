import React, { useMemo } from "react";
import uuid from "react-uuid";
// Components
import * as St from "../styledComponents/StyledFoo";
function Footer() {
  console.log("footer: ", "Render");
  const fooTitleArr = useMemo(
    () => [
      "모든 저작권은 Tooniverse에게..",
      "손오공 언제 철들래;;; 치치에게 감사해라",
      "어쨋거나 내 유년시절 그대들에게 감사",
    ],
    []
  );

  return (
    <St.LayoutFoo>
      <St.FooContainer>
        <St.FooNoticeContainer>
          {fooTitleArr.map((text, i) =>
            i === 0 ? (
              <St.FooNoticeItem key={uuid()} color="#000" fontSize="20">
                {text}
              </St.FooNoticeItem>
            ) : (
              <St.FooNoticeItem key={uuid()}>{text}</St.FooNoticeItem>
            )
          )}
        </St.FooNoticeContainer>
        <St.FooBottom>
          <St.FooMain>
            <St.FooLogoBox>
              <St.FooLogoImg />
            </St.FooLogoBox>

            <St.FooAddr>
              <St.FooAddrList>
                <St.FooAddrListItem>
                  <St.FooSpan>
                    시청자 상담실 (편성 문의 및 시청자 의견) :
                    <St.FooStrong> 080-080-0780 </St.FooStrong>
                  </St.FooSpan>
                </St.FooAddrListItem>
              </St.FooAddrList>

              <St.FooAddrList>
                <St.FooAddrListItem>
                  <St.FooSpan>
                    (주)씨제이이엔엠 대표이사 : 구창근, 윤상현
                  </St.FooSpan>
                </St.FooAddrListItem>
                <St.FooAddrListItem>
                  <St.FooSpan>
                    <St.FooStrong $underline="true">
                      사업자정보확인
                    </St.FooStrong>
                  </St.FooSpan>
                </St.FooAddrListItem>
              </St.FooAddrList>

              <St.FooAddrList>
                <St.FooAddrListItem>
                  <St.FooSpan>
                    본점 : (06761) 서울시 서초구 과천대로 870-13
                  </St.FooSpan>
                </St.FooAddrListItem>
                <St.FooAddrListItem>
                  <St.FooSpan>
                    사업장 : (03926) 서울시 마포구 상암산로 66
                  </St.FooSpan>
                </St.FooAddrListItem>
                <St.FooAddrListItem $pseudo="true">
                  <St.FooSpan>사업자 등록번호 : 106-81-51510</St.FooSpan>
                </St.FooAddrListItem>
                <St.FooAddrListItem $pseudo="true">
                  <St.FooSpan>개인정보 보호책임자 : 강봉관</St.FooSpan>
                </St.FooAddrListItem>
              </St.FooAddrList>
              <St.FooCopyRight>
                <St.FooCopyParagraph>
                  ⓒ CJ ENM. All Rights Reserved.
                </St.FooCopyParagraph>
              </St.FooCopyRight>

              {/* footer sns logo */}
              <St.FooMediaBox>
                <St.FooSns>
                  <St.FooLogoInstagram />
                </St.FooSns>
                <St.FooSns>
                  <St.FooLogoFacebook />
                </St.FooSns>
                <St.FooSns>
                  <St.FooLogoYoutube />
                </St.FooSns>
                <St.FooSns>
                  <St.FooLogoTwitter />
                </St.FooSns>
              </St.FooMediaBox>
              {/* footer sns logo */}
            </St.FooAddr>
          </St.FooMain>
        </St.FooBottom>
      </St.FooContainer>
    </St.LayoutFoo>
  );
}

export default Footer;
