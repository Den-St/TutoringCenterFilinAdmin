import { useEffect } from "react";
import { Button, Checkbox, Form, Input, Select, TimePicker } from "antd";
import Title from "antd/es/typography/Title";
import { ChangeVideoLessonT, VideoLessonT } from "../../types/videoLesson";
import { useSearchCourseThemes } from "../../hooks/searchCourseThemes";
import { CourseThemeT } from "../../types/courseThemes";
const {Option} = Select;

type Props = {
    onChangeItem:(data:ChangeVideoLessonT) => void,
    pickedItem?:VideoLessonT | null
    chosenTheme:CourseThemeT | null
    onChangeChosenTheme:(themeStr:string) => void
}

export const ChangeItemForm:React.FC<Props> = ({onChangeItem,pickedItem,chosenTheme,onChangeChosenTheme}) => {
    const {debounceSearchClass,classSearchLoading,courseThemesItems} = useSearchCourseThemes();

    const [form] = Form.useForm<ChangeVideoLessonT>();

    useEffect(() => {
        if(!pickedItem)return;
        form.setFieldsValue({...pickedItem,courseTheme:JSON.stringify(pickedItem?.courseTheme)});
        onChangeChosenTheme(JSON.stringify(pickedItem?.courseTheme));
    },[pickedItem]);

    return <Form onFinish={onChangeItem} form={form} disabled={!pickedItem} autoComplete={'off'}>
        <Title level={4}>Change video lesson</Title>
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