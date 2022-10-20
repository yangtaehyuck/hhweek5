const PostService = require('./post.services')

const mockPostService = () => ({
    findAllPost : jest.fn(),
    findPostById : jest.fn(),
    createPost : jest.fn()
})

describe ('게시글', () =>{
    let postService = new PostService()
    //Repository를 Mocking

    beforeEach(()=>{
    //새로운 서비스 할당
    postService = new PostService()
    //Repository를 Mocking
    postService.PostRepository = Object.assign(
        {}, 
        mockPostService
        )

        jest.resetAllMocks()
    })

// test('게시글 목록 조회 할 수 있어야 한다.', async() => {
//     const findAllPostService = {
//         "postId" : "1",
//         "nickname" : "yikuzo88",
//         "title" : "제목입니다.",
//     }
//     const findAllPostResult = {
//         "postId" : "1",
//         "nickname" : "yikuzo88",
//         "title" : "제목입니다.",
//     }
//     postService.postRepository.findAllPost = jest.fn(() => {
//         return findAllPostResult
//     }) 
//     await postService.findAllPost(findAllPostService)

//     expect(postService.postRepository).toHaveBeenCalledTimes(1)
//     expect(postService.postRepository.findAllPost).toEqual(findAllPostResult)
// })

test('게시글 작성 성공했는지', async() => {
    const createPostServiceRepository = {
        "userId" : "1",
        "nickname" : "yikuzo88",
        "title" : "제목입니다.",
        "content" : "게시글입니다.",
        "likes" : 0
    }
    const createPostRepository = {

        "title" : "제목입니다.",
        "content" : "게시글입니다.",

    }
    postService.postRepository.createPost = jest.fn(() => {
        return createPostRepository
    })

    await postService.createPost(createPostServiceRepository)
    
    expect(postService.postRepository.createPost)
    .toHaveBeenCalledTimes(1)
})
})
