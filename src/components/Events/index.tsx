import { Button, Carousel, Checkbox, Form, Input, Select, Space, Table,Image } from "antd";
import { ColumnsType, ColumnType, TablePaginationConfig } from "antd/es/table";
import {ChangeItemForm } from "./ChangeForm";
import { CarouselContainer, Container, ImageContainer, PhotosInput, PhotosInputContainer, RemovePhotoButton } from "./styles";
import { CourseT } from "../../types/course";
import { Timestamp } from "firebase/firestore";
import Title from "antd/es/typography/Title";
import { FormsContainer } from "../Classes/styles";
import { CourseThemeT } from "../../types/courseThemes";
import { VideoLessonT } from "../../types/videoLesson";
import { Link } from "react-router-dom";
import { useCourseThemes } from "../../hooks/courseThemes";
import { useSearchCourse } from "../../hooks/searchCourse";
import {MinusCircleOutlined,PlusOutlined,CloseCircleOutlined,UploadOutlined} from '@ant-design/icons';
import { useEvents } from "../../hooks/events";
import { CreateEventFormT, CreateEventT, EventT } from "../../types/event";
import { useEffect } from "react";

export default function Events() {
    const {loading,onChangePagination,items,refetch,count,pagination,onChangeItem,onCreateItem,onRowEnter,pickedItem,debounceSearch} = useEvents();
    const [form] = Form.useForm<CreateEventFormT>();
    const photos = Form.useWatch('photos', form);
    useEffect(() => {
        form.setFieldValue('photos',[]);
    },[]);
    
    const onChangeImages = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const oldImages = photos;
        const newPhotos = Object.keys(e.target.files).map(fileIndex => e?.target?.files?.[+fileIndex]);
        form.setFieldValue('photos',oldImages?.length ? [...oldImages,...newPhotos] : newPhotos);
        console.log('oldImages',oldImages)
        console.log('newPhotos',newPhotos)
    }
    const removeImage = (photo:File) => {
        form.setFieldValue('photos',photos?.filter((file:File) => file !== photo) || []);
    }
    const paginationConfig:TablePaginationConfig = {
        onChange: onChangePagination,
        total:count,
        defaultPageSize:5,
        current:pagination.page,
        onShowSizeChange: onChangePagination,
        showSizeChanger:true,
        pageSizeOptions:[5,10,20,50],
        showPrevNextJumpers:true
    }
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: EventT[]) => {
            onRowEnter(selectedRows[0]);
        },
        getCheckboxProps: (item: EventT) => ({...item}),
    };
    const columns:ColumnsType<EventT> = [
        {
            title:'Назва',
            dataIndex:'name',
            key:'name',
            filterDropdown:() => {
                return <Input onChange={(e) => debounceSearch(e.target.value)}/>
            }
        },
        {
            title:'Опис',
            dataIndex:'description',
            key:'description'
        },
        {
            title:'Created at',
            dataIndex:'createdAt',
            key:'createdAt',
            render:(value:Timestamp) => value?.toDate()?.toLocaleString()
        },
        {
            title:'Is active',
            dataIndex:'isActive',
            key:'isActive',
            render:(value) => <Checkbox checked={value} onChange={() => {}} />
        }
    ];

    console.log('photos',photos)
    return <Container >
        <Table style={{width:'50%'}}
            rowSelection={{
                type: 'radio',
                ...rowSelection,
            }}
            columns={columns} 
            dataSource={items.map(item => ({...item,key:item.id}))}
            loading={loading.items} pagination={paginationConfig}/>
        <FormsContainer>
            <Form onFinish={onCreateItem} autoComplete={'off'} form={form}>
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
                    <PhotosInput type={'file'} onChange={onChangeImages} multiple={true}/>
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
                    <Input />
                </Form.Item>
                <Form.Item
                    style={{display:'none'}}
                    name="photos"
                >
                </Form.Item>
                <Form.Item
                    label="Активний"
                    name="isActive"
                    valuePropName="checked"
                >
                    <Checkbox/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <ChangeItemForm pickedItem={pickedItem} onChangeItem={onChangeItem}/>
        </FormsContainer>
    </Container>
}

