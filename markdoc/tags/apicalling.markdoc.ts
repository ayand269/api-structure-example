import ApiCalling from "@/components/ApiCalling";

export const apicalling = {
    render: ApiCalling,
    attributes: {
        method: { type: String, render: 'method', required: true },
        endpoint: { type: String, render: 'endpoint', required: true },
        headers: {type: String, render: 'headers', required: true},
        data: {type: String, render: 'data', required: true},
        baseurl: {type: String, render: 'baseurl', required: true}
    },
};