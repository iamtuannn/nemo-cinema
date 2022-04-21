import { DatePicker, Input, Switch } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postNewsAction } from "../../redux/actions";
import { AntDesignForm, AntDesignFormItem } from "../../styles/AntDesign";
import { Container, Heading, StyledButton } from "../../styles/Styles";
import { NEMO } from "../../utils/config";

export default function AddNews() {
  document.title = `Add News - ${NEMO}`;
  const dateFormat = "DD/MM/YYYY HH:mm";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      excerpt: "",
      titleUrl: "",
      imageUrl: "",
      published: "",
      trending: false,
      popular: false,
      body: "",
    },
    onSubmit: (values) => dispatch(postNewsAction(values, navigate)),
  });

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
          <Switch onChange={handleChangeSwitch("popular")} />
        </AntDesignFormItem>

        <AntDesignFormItem label="Trending">
          <Switch onChange={handleChangeSwitch("trending")} />
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
          <StyledButton type="submit">ADD NEWS</StyledButton>
        </AntDesignFormItem>
      </AntDesignForm>
    </Container>
  );
}
