import { useEffect } from "react";
import { Button, Carousel, Checkbox, Form, Input, Select, TimePicker,Image } from "antd";
import Title from "antd/es/typography/Title";
import { ChangeVideoLessonT, VideoLessonT } from "../../types/videoLesson";
import { useSearchCourseThemes } from "../../hooks/searchCourseThemes";
import { CourseThemeT } from "../../types/courseThemes";
import { ChangeTestFormT, ChangeTestT, TestT } from "../../types/test";
import { AnswerInputsContainer, CarouselContainer, ImageContainer, IsCorrectAnswerContainer, PhotosInput, PhotosInputContainer, RemovePhotoButton } from "./styles";
import {CloseCircleOutlined,UploadOutlined} from "@ant-design/icons";
import FormItemLabel from "antd/es/form/FormItemLabel";

const {Option} = Select;

type Props = {
    onChangeItem:(data:ChangeTestFormT) => void,
    pickedItem?:TestT | null
    chosenTheme:CourseThemeT | null
    onChangeChosenTheme:(themeStr:string) => void
}

export const ChangeItemForm:React.FC<Props> = ({onChangeItem,pickedItem,chosenTheme,onChangeChosenTheme}) => {
    const {debounceSearchClass,classSearchLoading,courseThemesItems} = useSearchCourseThemes();

    const [form] = Form.useForm<ChangeTestFormT>();
    const photos = Form.useWatch('photos', form);
    const answers = Form.useWatch('answers', form);
    const maxPhotos = 5;
    const answersInputs = [0,1,2,3];
   
    const onChangeAnswerText = (text:string,number:number) => {
        form.setFieldValue('answers',{...answers,[number]:{...answers[number],text}});
    }
    const onChangeAnswerIsCorrect = (checked:boolean,number:number) => {
        form.setFieldValue('answers',{...answers,[number]:{...answers[number],isCorrect:checked}});
    }
    const onChangeImages = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const oldImages = photos;
        if (oldImages?.length === maxPhotos) return;
        console.log(photos)
        const newPhotos = Object.keys(e.target.files).slice(0,maxPhotos - (oldImages?.length || 0)).map(fileIndex => e?.target?.files?.[+fileIndex]);
        form.setFieldValue('photos',oldImages?.length ? [...oldImages,...newPhotos] : newPhotos);
    }

    const removeImage = (photo:File) => {
        form.setFieldValue('photos',photos?.filter((file:File) => file !== photo) || []);
    }
    useEffect(() => {
        if(!pickedItem)return;
        form.setFieldsValue({...pickedItem,courseTheme:JSON.stringify(pickedItem?.courseTheme),photos:[],});
        onChangeChosenTheme(JSON.stringify(pickedItem?.courseTheme));
    },[pickedItem]);

    return <Form onFinish={onChangeItem} form={form} disabled={!pickedItem} autoComplete={'off'}>
        <Title level={4}>Change test</Title>
        <CarouselContainer>
            {!!photos?.length && <Carousel >
                {photos?.map((image:File) => <ImageContainer key={image.lastModified}>
                    <Image src={URL.createObjectURL(image)} preview={{src:URL.createObjectURL(image)}}/>
                    <RemovePhotoButton onClick={() => removeImage(image)}><CloseCircleOutlined/></RemovePhotoButton>
                </ImageContainer>
                )}
            </Carousel>}
        </CarouselContainer>
        <PhotosInputContainer $disabled={photos?.length === maxPhotos}>
            {photos?.length ? <p>+</p> : <UploadOutlined/>}
            <PhotosInput disabled={photos?.length === maxPhotos} type={'file'} onChange={onChangeImages} multiple={true} max={5}/>
        </PhotosInputContainer> 
        <Form.Item
            label="Course theme"
            name="courseTheme"
            rules={[{ required: true, message: 'Please choose course theme!' }]}
        >
              <Select 
                onSearch={debounceSearchClass}
                showSearch={true}
                loading={classSearchLoading}
                value={chosenTheme ? JSON.stringify(chosenTheme) : ''}
                onChange={onChangeChosenTheme}
                >
                    {courseThemesItems?.length ? courseThemesItems.map(courseItem => 
                        <Option key={courseItem.id} value={JSON.stringify(courseItem)}>
                            {courseItem.name}
                        </Option>
                    ) : pickedItem?.courseTheme &&
                    <Option key={pickedItem?.courseTheme?.id} value={JSON.stringify(pickedItem?.courseTheme)}>
                        {pickedItem?.courseTheme?.name}
                    </Option>}
            </Select>  
        </Form.Item>
        <Form.Item
            label="Number"
            name="number"
            rules={[{ required: true, message: 'Please input number!' }]}
        >
            <Input type={'number'}/>
        </Form.Item>
        <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input description of test!' }]}
        >
            <Input.TextArea autoSize={true} />
        </Form.Item>
        <Form.Item
            label="Answers"
            name="answers"
            rules={[{ required: true, message: 'Please input description of test!' }]}
        >
        </Form.Item>    
        <AnswerInputsContainer>
            {answers && answersInputs.map((answerInput) => <>
                <FormItemLabel label={`${answerInput + 1} answer`} prefixCls="" required={false}/>
                <Input.TextArea value={answers[answerInput].text} autoSize={true} onChange={(e) => onChangeAnswerText(e.target.value,answerInput)}/>
                <IsCorrectAnswerContainer>
                    <FormItemLabel label={`Is correct`} prefixCls="" required={false}/> 
                    <Checkbox checked={answers[answerInput].isCorrect} onChange={(e) => onChangeAnswerIsCorrect(e.target.checked,answerInput)} disabled={Object.keys(answers).some(key => answers[+key].isCorrect && +key !== answerInput)}/> 
                </IsCorrectAnswerContainer>
            </>)}   
        </AnswerInputsContainer>
        <Form.Item
            label="Is active"
            name="isActive"
            valuePropName="checked"
        >
            <Checkbox/>
        </Form.Item>
        <Form.Item
            style={{display:'none'}}
            label="Created time"
            name="createdAt"
            valuePropName="checked"
        >
            <TimePicker disabled/>
        </Form.Item>
        <Form.Item
            style={{display:'none'}}
            name="photos"
            valuePropName="checked"
        >
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
}