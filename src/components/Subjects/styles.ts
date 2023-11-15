import styled from "styled-components";

export const Container = styled.main`
    display:flex;
    flex-direction:column;
    width:100%;
    height:100%;
    align-items:center;
    gap:50px;
`;

export const FormsContainer = styled.div`
    display:flex;
    width:50%;
    gap:20px;
    justify-content:space-between;
    .ant-form{
        width:50%;
    }
    .ant-carousel{
        display:unset;
    }
    .ant-image-img{
        width:160px;
        height:160px;
        object-fit:contain;
    }
    .slick-current{
        display:flex;
        justify-content:center;
        align-items:center;
        background:rgb(31,32,36);
        opacity:0.9;
    }
    .slick-active{
        display:flex;
        justify-content:center;
        align-items:center;
        background:rgb(31,32,36);
        opacity:0.9;
    }
    .slick-slide{
        display:flex;
        justify-content:center;
        align-items:center;
        background:rgb(31,32,36);
        opacity:0.9;
        position:relative;
    }
    :where(.css-dev-only-do-not-override-1m62vyb).ant-carousel .slick-initialized .slick-slide {
        display: flex;
    }
`;