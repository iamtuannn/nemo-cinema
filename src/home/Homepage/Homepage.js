import { Skeleton } from "antd";
import React from "react";
import { Container } from "../../styles/Styles";
import { NEMO } from "../../utils/config";

export default function Homepage() {
  document.title = NEMO;
  return (
    <Container>
      <Skeleton active paragraph={{ rows: 20 }} />
    </Container>
  );
}
