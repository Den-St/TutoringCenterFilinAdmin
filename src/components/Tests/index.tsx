import { Button, Carousel, Checkbox, Form, Input, Select, Table,Image, TimePicker } from "antd";
import { ColumnsType, TablePaginationConfig,ColumnType } from "antd/es/table";
import {ChangeItemForm } from "./ChangeForm";
import { AnswerInputsContainer, CarouselContainer, Container, ImageContainer, IsCorrectAnswerContainer, PhotosInput, PhotosInputContainer, RemovePhotoButton } from "./styles";
import { Timestamp } from "firebase/firestore";
import Title from "antd/es/typography/Title";
import { FormsContainer } from "../Classes/styles";
import { CourseThemeT, CreateCourseThemeT } from "../../types/courseThemes";
import { VideoLessonT } from "../../types/videoLesson";
import { Link } from "react-router-dom";
import { useVideoLessons } from "../../hooks/videoLessons";
import { useSearchCourseThemes } from "../../hooks/searchCourseThemes";
import { useTests } from "../../hooks/tests";
import { CreateTestFormT, CreateTestT, TestT } from "../../types/test";
import {CloseCircleOutlined,UploadOutlined} from "@ant-design/icons";
import { useEffect } from "react";
import FormItemLabel from "antd/es/form/FormItemLabel";
const {Option} = Select;

export default function Tests() {
    const {loading,onChangePagination,items,refetch,count,pagination,onChangeItem,onCreateItem,onRowEnter,pickedItem,chosenTheme,onChangeChosenTheme,debounceSearch} = useTests();
    const {debounceSearchClass,classSearchLoading,courseThemesItems} = useSearchCourseThemes();
    console.log(items)

    const [form] = Form.useForm<CreateTestFormT>();
    const photos = Form.useWatch('photos', form);
    const answers = Form.useWatch('answers', form);
    const maxPhotos = 5;
    const answersInputs = [0,1,2,3];

    useEffect(() => {
        form.setFieldValue('photos',[]);
        form.setFieldValue('answers',{0:{text:'',isCorrect:false},
                                      1:{text:'',isCorrect:false},
                                      2:{text:'',isCorrect:false},
                                      3:{text:'',isCorrect:false}});
    },[]);
    
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
        onChange: (selectedRowKeys: React.Key[], selectedRows: TestT[]) => {
            onRowEnter(selectedRows[0]);
        },
        getCheckboxProps: (item: TestT) => ({...item}),
    };
    const columns:ColumnsType<TestT> = [
        // {
        //     title:'ID',
        //     dataIndex:'id',
        //     key:'id'
        // },
        {
            title:'Description',
            dataIndex:'description',
            key:'description',
            render:(text:string) => text.length >= 100 ? text.slice(0,100) + '...' : text,
            filterDropdown:() => {
                return <Input onChange={(e) => debounceSearch(e.target.value)}/>
            }
        },
        {
            title:'Number',
            dataIndex:'number',
            key:'number',
        },
        {
            title:'Theme',
            dataIndex:'courseTheme',
            key:'courseTheme',
            render:(value:CourseThemeT) => value?.name
        },
        {
            title:'Photos',
            dataIndex:'photos',
            key:'photos',
            render:(photos:string[]) => <div>{photos.map(photo => <img src={photo}/>)}</div>
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
    console.log(photos)
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
                <Title level={4}>Create test</Title>
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
                        <Input.TextArea autoSize={true} onChange={(e) => onChangeAnswerText(e.target.value,answerInput)}/>
                        <IsCorrectAnswerContainer>
                            <FormItemLabel label={`Is correct`} prefixCls="" required={false}/> 
                            <Checkbox onChange={(e) => onChangeAnswerIsCorrect(e.target.checked,answerInput)} disabled={Object.keys(answers).some(key => answers[+key].isCorrect && +key !== answerInput)}/> 
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
                >
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <ChangeItemForm onChangeChosenTheme={onChangeChosenTheme} chosenTheme={chosenTheme} pickedItem={pickedItem}  onChangeItem={onChangeItem}/>
        </FormsContainer>
    </Container>
}

