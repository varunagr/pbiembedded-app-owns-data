import { FC } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { DatasetData } from './DatasetData';
import { gray2, gray3 } from './Styles';
import { PrimaryButton } from './Styles';

interface Props {
    data: DatasetData;
}

export const Dataset: FC<Props> = ({ data }) => (
    <div
      css={css`
        padding: 10px 0px;
      `}
    >
      <div
        css={css`
          padding: 10px 0px;
          font-size: 19px;
        `}
      >
        {data.datasetName}
        </div>
    <div
      css={css`
        font-size: 12px;
        font-style: italic;
        color: ${gray3};
      `}
    >
      {`Created by
        ${data.createdBy} `}
    </div>
    <PrimaryButton>Import Into Power BI</PrimaryButton>
    </div>
);