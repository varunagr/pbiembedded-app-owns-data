/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { PrimaryButton } from './Styles';
import { DatasetList } from "./Datasets";
import { getDatasets} from "./DatasetData"
import { Page } from "./Page";
import { PageTitle } from "./PageTitle";

export const HomePage = () => (
    <Page>
        <div
            css={css`
            margin: 50px auto 20px auto;
            padding: 30px 20px;
            max-width: 600px;
        `}
        >
            <div
                css={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
            `}
            >
                <h2
                    css={css`
                    font-size: 15px;
                    font-weight: bold;
                    margin: 10px 0px 5px;
                    text-align: center;
                    text-transform: uppercase;
                `}
                
                >Datasets</h2>
            <PrimaryButton>Import All Into Power BI</PrimaryButton>
            </div>
            <DatasetList data={getDatasets()} />
        </div>
    </Page>
);