import { Button, Checkbox, Form, Input, Select, Table } from "antd";
import { ColumnsType, TablePaginationConfig,ColumnType } from "antd/es/table";
import {ChangeItemForm } from "./ChangeForm";
import { Container } from "./styles";
import { Timestamp } from "firebase/firestore";
import Title from "antd/es/typography/Title";
import { FormsContainer } from "../Classes/styles";
import { CourseThemeT } from "../../types/courseThemes";
import { VideoLessonT } from "../../types/videoLesson";
import { Link } from "react-router-dom";
import { useVideoLessons } from "../../hooks/videoLessons";
import { useSearchCourseThemes } from "../../hooks/searchCourseThemes";
const {Option} = Select;

export default function VideoLessons() {
    const {loading,onChangePagination,items,refetch,count,pagination,onChangeItem,onCreateItem,onRowEnter,pickedItem,chosenTheme,onChangeChosenTheme,debounceSearch} = useVideoLessons();
    const {debounceSearchClass,classSearchLoading,courseThemesItems} = useSearchCourseThemes();

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
    console.log(items)
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: VideoLessonT[]) => {
            onRowEnter(selectedRows[0]);
        },
        getCheckboxProps: (item: VideoLessonT) => ({...item}),
    };
    const getColumnSearchProps = (dataIndex:'name'):ColumnType<VideoLessonT> => {
        return {
            filterDropdown:({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => {
                return <Input onChange={(e) => debounceSearch(e.target.value)}/>
            }
        }
    }
    const columns:ColumnsType<VideoLessonT> = [
        // {
        //     title:'ID',
        //     dataIndex:'id',
        //     key:'id'
        // },
        {
            title:'Name',
            dataIndex:'name',
            key:'name',
            ...getColumnSearchProps('name')
        },
        {
            title:'Description',
            dataIndex:'description',
            key:'description',
            render:(text:string) => text.length >= 100 ? text.slice(0,100) + '...' : text,
        },
        {
            title:'Video URL',
            dataIndex:'videoURL',
            key:'videoURL',
            render:(value:string) => <a target={'_blank'} href={value}>{value.slice(0,40)}</a>
        },
        {
            title:'Theme',
            dataIndex:'courseTheme',
            key:'courseTheme',
            render:(value:CourseThemeT) => value?.name
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
            <Form onFinish={onCreateItem} autoComplete={'off'}>
                <Title level={4}>Create video lesson</Title>
                <Form.Item
                    label="Theme"
                    name="courseTheme"
                    rules={[{ required: true, message: 'Please choose theme of video!' }]}
                >
                     <Select 
                        onSearch={debounceSearchClass}
                        showSearch={true}
                        loading={classSearchLoading}
                        value={chosenTheme ? JSON.stringify(chosenTheme) : ''}
                        onChange={onChangeChosenTheme}
                        >
                            {courseThemesItems && courseThemesItems.map(courseThemeItem => 
                                <Option key={courseThemeItem.id} value={JSON.stringify(courseThemeItem)}>
                                    {courseThemeItem.name}
                                </Option>
                            )}
                    </Select>  
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input name of video!' }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Video URL"
                    name="videoURL"
                    rules={[{ required: true, message: 'Please input video URL!' }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Number"
                    name="number"
                    rules={[{ required: true, message: 'Please input number of video!' }]}
                >
                    <Input type={"number"} />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input description of video lesson!' }]}
                >
                    <Input.TextArea autoSize={true} />
                </Form.Item>
                <Form.Item
                    label="Is active"
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
            <ChangeItemForm onChangeChosenTheme={onChangeChosenTheme} chosenTheme={chosenTheme} pickedItem={pickedItem} onChangeItem={onChangeItem}/>
        </FormsContainer>
    </Container>
}

