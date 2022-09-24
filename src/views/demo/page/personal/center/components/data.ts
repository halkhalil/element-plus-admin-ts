import Mock from "mockjs";

interface project {
    title: string,
    time: string,
    image: string,
    desc: string,
    name: string
}

export const getProjectData = (count = 27) => {
    const result: project[] = [];
    for (let i = 0; i < count; i++) {
        result.push({
            title: Mock.Random.ctitle(),
            time: Mock.Random.time('mm-dd HH:mm'),
            image: Mock.Random.image('200'),
            desc: Mock.Random.cparagraph(1, 10),
            name: Mock.Random.cname()
        } as project);
    }
    return result;
};

export const getTagData = () => {
    return [
        {name: '能量满满', type: ''},
        {name: '专注设计', type: 'success'},
        {name: '海纳百川', type: 'info'},
        {name: '程序员', type: 'warning'},
        {name: 'HTML', type: 'danger'},
        {name: 'Javascript', type: 'success'},
        {name: 'VUE3', type: 'info'},
        {name: 'Go', type: 'danger'},
        {name: 'WindCss', type: ''},
    ]
}