import { useEffect } from "react";
import { Button, Carousel, Checkbox, Form, Input, Select, TimePicker,Image } from "antd";
import Title from "antd/es/typography/Title";
import { UploadOutlined, CloseCircleOutlined} from '@ant-design/icons';
import { ChangeEventFormT, EventT } from "../../types/event";
import { CarouselContainer, ImageContainer, RemovePhotoButton, PhotosInputContainer, PhotosInput } from "./styles";

type Props = {
    onChangeItem:(data:ChangeEventFormT) => void,
    pickedItem?:EventT | null,
}

export const ChangeItemForm:React.FC<Props> = ({onChangeItem,pickedItem}) => {
    const [form] = Form.useForm<ChangeEventFormT>();
    const photos = Form.useWatch('photos', form);
    const onChangeImages = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const oldImages = photos;
        console.log(photos)
        const newPhotos = Object.keys(e.target.files).map(fileIndex => e?.target?.files?.[+fileIndex]);
        form.setFieldValue('photos',oldImages?.length ? [...oldImages,...newPhotos] : newPhotos);
    }
    const removeImage = (photo:File) => {
        form.setFieldValue('photos',photos?.filter((file:File) => file !== photo) || []);
    }
    useEffect(() => {
        if(!pickedItem) return;
        form.setFieldsValue({...pickedItem,photos:[]});
    },[pickedItem]);

    return <Form onFinish={onChangeItem} form={form} disabled={!pickedItem} autoComplete={'off'}>
        <Title level={4}>Change theme</Title>
        <Title level={4}>Створити подію</Title>
        <CarouselContainer>
                {!!photos?.length && <Carousel >
                {photos?.map((image:File) => <ImageContainer key={image.lastModified}>
                    <Image src={URL.createObjectURL(image)} preview={{src:URL.createObjectURL(image)}}/>
                    <RemovePhotoButton onClick={() => removeImage(image)}><CloseCircleOutlined/></RemovePhotoButton>
                </ImageContainer>
                )}
                </Carousel>}
        </CarouselContainer>
        <PhotosInputContainer >
            {photos?.length ? <p>+</p> : <UploadOutlined/>}
            <PhotosInput type={'file'} onChange={onChangeImages} multiple={true} max={5}/>
        </PhotosInputContainer> 
        <Form.Item
            label="Назва"
            name="name"
            rules={[{ required: true, message: 'Введіть назву'}]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Опис"
            name="description"
            rules={[{ required: true, message: 'Введіть опис' }]}
        >
            <Input type={"number"} />
        </Form.Item>
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
}