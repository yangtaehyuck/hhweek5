const PostRepository = require('./post.repository')

const mockpostModels = () => ({
    findAll : jest.fn(),
    create : jest.fn(),
    findByPk : jest.fn()
})

describe ('게시글', () =>{
    let postRepository = new PostRepository()
    postRepository.posts = mockpostModels()

    beforeEach(()=>{ //모든 Mock을 초기화
        jest.resetAllMocks()
    })

    test('게시글 목록 조회', async () => {
        const findAllPostFindAllResult = []
        postRepository.posts.findAll = jest.fn(()=>{
            return findAllPostFindAllResult
        })   
        const post = await postRepository.findAllPost({})
        //console.log(postRepository.posts.findAll)

        expect(postRepository.posts.findAll)
        .toHaveBeenCalledTimes(1)

        //findAll의 결과값이 return값과 동일한가
        expect(post).toEqual(findAllPostFindAllResult)
    })

    test('게시글 상세 조회', async () => {
        const findByPkPostFindByPkResult = []
        postRepository.posts.findByPk = jest.fn(() => {        
            return findByPkPostFindByPkResult
        })   
        const post = await postRepository.findPostById({})
        //console.log(postRepository.posts.findByPk)

        //1. findByPk을 몇번 실행했는가
        expect(postRepository.posts.findByPk)
        .toHaveBeenCalledTimes(1)

        //2. findByPk의 결과값이 return값과 동일한가
        expect(post).toEqual(findByPkPostFindByPkResult)
    })

    test('게시글 작성', async () => {
        const createPostModels = {
            title : '제목입니다.',
            content : '게시글입니다.',
        }
        const findcreatePostModels = {
            "userId" : "1",
            "nickname" : "yikuzo88",
            "title" : "제목입니다.",
            "content" : "게시글입니다.",
            "likes" : 0
        }
        
        postRepository.posts.create = jest.fn(() => {
            return findcreatePostModels
        })

        const createPostData = await postRepository.createPost(createPostModels)

        //1. createPost으로 검색한 결과값은 가공 없이 바로 반환된다.
        expect(createPostData).toEqual(findcreatePostModels)
        

        //2. createPost으로 입력한 값이 내가 생각한 값과 일치하는가
    //     expect(postRepository.posts.create)
    //     .toHaveBeenCalledWith({
    //         title : createPostModels.title,
    //         contet : createPostModels.content
    // })

        //3. createPost이 내가 생각한 만큼 실행 되었는가 
        expect(postRepository.posts.create)
        .toHaveBeenCalledTimes(1)
    })
})
