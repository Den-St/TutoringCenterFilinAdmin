import styled from "styled-components";

export const Container = styled.main`
    display:flex;
    flex-direction:column;
    width:100%;
    height:100%;
    align-items:center;
    gap:50px;
    
`;


export const ImageContainer = styled.div`
    width:100%;
`;

export const RemovePhotoButton = styled.span`
    background:transparent;
    border:none;
    outline:none;
    font-size:25px;
    position:absolute;
    padding:5px;
    right:10px;
    top:10px;
    color:white;
`;

export const InputBlock = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
    width:80%;
`;

export const InputHeader = styled.h4`
    margin:0;
    font-size:17px;
    color:white;
`;

export const CategoryIcon = styled.img`
    width:20px;
    height:20px;
    object-fit:contain;
`;

export const CategoryContainer = styled.div`
    display:flex;
    align-items:center;
    gap:6px;
`;

export const PhotosInputContainer = styled.div<{$disabled:boolean}>`
    position:relative;
    width:60px;
    height:33px;
    margin-bottom:20px;
    background:#1677ff;
    border-radius:5px;
    margin-top:10px;
    .anticon{
        position:absolute;
        padding:5px;
        font-size:20px;
        /* width:50px; */
        ${({$disabled}) => $disabled ? `background:#989898;` : `background:#1677ff;`}
        color:white;
        left: 15px;
    }
    p{
        position:absolute;
        margin:0;
        padding:5px;
        font-size:20px;
        width:50px;
        ${({$disabled}) => $disabled ? `background:#989898;` : `background:#1677ff;`}
        color:white;
        border-radius:5px;
        text-align:center;
    }
`;

export const PhotosInput = styled.input`
    opacity:0;
    width:60px;
    height:33px;
`;

export const DescriptionTextarea = styled.textarea`
    width:80%;
`;

export const CreateButton = styled.input`
    width:100px;
    color:white;
    outline:none;
    border:none;
    border-radius:5px;
    padding:5px;
    
    &:hover{
        opacity:0.9;
    }
`;

export const IsCorrectAnswerContainer = styled.div`
    display:flex;
    gap:5px;
    align-items:center;
`;

export const AnswerInputsContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
`;

export const CarouselContainer = styled.div`
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
    .slick-slide.slick-active.slick-current{
        div{
            display:flex;
            justify-content:center;
        }
    }
`;