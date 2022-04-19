import { DatePicker, Input, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getNewsAction, putNewsAction } from "../../redux/actions";
import { AntDesignForm, AntDesignFormItem } from "../../styles/AntDesign";
import { Container, Heading, StyledButton } from "../../styles/Styles";
import { NEMO } from "../../utils/config";

export default function EditNews() {
  document.title = `Edit News - ${NEMO}`;
  const dateFormat = "DD/MM/YYYY HH:mm";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const news = useSelector((state) => state.NewsReducer.news);

  useEffect(() => {
    dispatch(getNewsAction(params.id, navigate));
  }, [dispatch, navigate, params.id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      _id: news._id,
      title: news.title,
      excerpt: news.excerpt,
      titleUrl: news.titleUrl,
      imageUrl: news.imageUrl,
      published: moment(news.published, dateFormat).format(dateFormat),
      trending: news.trending,
      popular: news.popular,
      body: news.body,
    },
    onSubmit: (values) => dispatch(putNewsAction(values, params.id, navigate)),
  });

  const initialValues = [
    {
      name: ["title"],
      value: formik.values.title,
    },
    {
      name: ["excerpt"],
      value: formik.values.excerpt,
    },
    {
      name: ["titleUrl"],
      value: formik.values.titleUrl,
    },
    {
      name: ["imageUrl"],
      value: formik.values.imageUrl,
    },
    {
      name: ["published"],
      value: moment(formik.values.published, dateFormat),
    },
    {
      name: ["body"],
      value: formik.values.body,
    },
  ];

  const handleChangeDatePicker = (value) =>
    formik.setFieldValue("published", value.format(dateFormat));

  const handleChangeSwitch = (name) => (value) =>
    formik.setFieldValue(name, value);

  return (
    <Container>
      <Heading admin>Add News</Heading>
      <AntDesignForm
        onFinish={formik.handleSubmit}
        labelCol={{ sm: { span: 6 }, lg: { span: 3 } }}
        fields={initialValues}
      >
        <AntDesignFormItem
          label="Title"
          admin="true"
          name="title"
          rules={[{ required: true, message: "Please input news title" }]}
        >
          <Input onChange={formik.handleChange} />
        </AntDesignFormItem>

        <AntDesignFormItem
          label="Title Url"
          admin="true"
          name="titleUrl"
          rules={[{ required: true, message: "Please input news title url" }]}
        >
          <Input onChange={formik.handleChange} />
        </AntDesignFormItem>

        <AntDesignFormItem
          label="Title Excerpt"
          admin="true"
          name="excerpt"
          rules={[{ required: true, message: "Please input news excerpt" }]}
        >
          <Input onChange={formik.handleChange} />
        </AntDesignFormItem>

        <AntDesignFormItem
          label="Image Url"
          admin="true"
          name="imageUrl"
          rules={[{ required: true, message: "Please input news image url" }]}
        >
          <Input onChange={formik.handleChange} />
        </AntDesignFormItem>

        <AntDesignFormItem
          label="Release Date"
          admin="true"
          name="published"
          rules={[
            { required: true, message: "Please input news publish date" },
          ]}
        >
          <DatePicker
            onChange={handleChangeDatePicker}
            showTime
            format={dateFormat}
          />
        </AntDesignFormItem>

        <AntDesignFormItem label="Popular">
          <Switch
            onChange={handleChangeSwitch("popular")}
            checked={formik.values.popular}
          />
        </AntDesignFormItem>

        <AntDesignFormItem label="Trending">
          <Switch
            onChange={handleChangeSwitch("trending")}
            checked={formik.values.trending}
          />
        </AntDesignFormItem>

        <AntDesignFormItem
          label="Content"
          admin="true"
          name="body"
          rules={[{ required: true, message: "Please input news content" }]}
        >
          <Input.TextArea onChange={formik.handleChange} rows={13} />
        </AntDesignFormItem>
        <AntDesignFormItem>
          <StyledButton type="submit">Update News</StyledButton>
        </AntDesignFormItem>
      </AntDesignForm>
    </Container>
  );
}
