const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require('./db/connection.js');
const users = require('./seed/users.json')
const profiles = require('./seed/profiles.json')
const posts = require('./seed/posts.json')
const likes = require('./seed/likes.json')
const comments = require('./seed/comments.json')

describe('Social Sequelzie Test', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the test suite is run
        await db.sync({ force: true });
    })

    // Write your tests here
    
    test("creat Bulk user",async function() {
        const bulkUsers = await User.bulkCreate(users)
        expect(bulkUsers[0]).toEqual(expect.objectContaining(users[0]));
    })


    test("creat Bulk profile",async function() {
        const bulkProfiles = await Profile.bulkCreate(profiles)
        expect(bulkProfiles[0]).toEqual(expect.objectContaining(profiles[0]));
    })


    test("creat Bulk post", async function() {
        const bulkPost = await Post.bulkCreate(posts)
        expect(bulkPost[0]).toEqual(expect.objectContaining(posts[0]));
    })


    test("creat Bulk likes",async function() {
        const bulkLikes = await Like.bulkCreate(likes)
        expect(bulkLikes[0]).toEqual(expect.objectContaining(likes[0]));
    })


    test("creat Bulk comment",async function() {
        const bulkComment = await Comment.bulkCreate(comments)
        expect(bulkComment[0]).toEqual(expect.objectContaining(comments[0]));
    })

    test('user can have only one profile', async()=>{
        // await db.sync({ force: true });
        const newUser = await User.create(users[0])
        const newProfile = await Profile.create(profiles[0])
        await newUser.setProfile(newProfile)
        const associatedProfile = await newUser.getProfile()

        expect(associatedProfile instanceof Profile).toBeTruthy()

    })


    test('user has many post', async ()=>{
        await db.sync({ force: true });
        const newUser = await User.create(users[0])
        const post1 = await Post.create(posts[0])
        const post2 = await Post.create(posts[1])
        const post3 = await Post.create(posts[2])

        await newUser.addPost(post1)
        await newUser.addPost(post2)
        await newUser.addPost(post3)

        const associatedPosts = await newUser.getPosts()
        expect(associatedPosts.length).toBe(3)
        

    })

    test('user has many likes', async ()=>{
        await db.sync({ force: true });
        const newUser = await User.create(users[0])
        const like1 = await Like.create(likes[0])
        const like2 = await Like.create(likes[1])
        const like3 = await Like.create(likes[2])

        await newUser.addLikes(like1)
        await newUser.addLikes(like2)
        await newUser.addLikes(like3)

        const associatedLikes = await newUser.getLikes()
        expect(associatedLikes.length).toBe(3)
        

    })
    test('likes can have many users', async ()=>{
        await db.sync({ force: true });
        const newLike = await Like.create(likes[0])
        const user1 = await User.create(users[1])
        const user2 = await User.create(users[2])
        const user3 = await User.create(users[0])

        await newLike.addUser(user1)
        await newLike.addUser(user2)
        await newLike.addUser(user3)
        const associatedUsers = await newLike.getUsers()
        expect(associatedUsers.length).toBe(3)
        

    })

    

})