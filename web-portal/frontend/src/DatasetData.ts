export interface DatasetData {
    datasetId: number;
    tenantId: number;
    datasetName: string;
    tags: string[];
    createDate: Date;
}

const datasets: DatasetData[] = [
    {
        datasetId: 1,
        tenantId: 1,
        datasetName: "Ratings and Summary Scores",
        tags: [
            "KeyIssueQuartiles",
            "GovernancePillarScore",
            "ESGRatingChange",
            "ESGRating",
            "SocialPillarScore"
        ],
        createDate: new Date()
    },
    {
        datasetId: 2,
        tenantId: 1,
        datasetName: "Drill Down Scores",
        tags: [
            "ESGRatingChange",
            "ESGRating",
            "KeyIssueQuartiles",
            "GovernancePillarScore",
            "KeyIssueScore"
        ],
        createDate: new Date()
    },
    {
        datasetId: 3,
        tenantId: 1,
        datasetName: "Analyst Insights",
        tags: [
            "Analyst Insight head",
            "Rating Analysis",
            "Analyst Insight narr",
            "GovernancePillarScore",
            "KeyIssueScore"
        ],
        createDate: new Date()
    }
];

export const getDatasets = (): DatasetData[] => {
    return datasets;
}