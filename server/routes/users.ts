import {type Request, type Response, Router} from "express";
import {mockUsers as users} from "../data/mockUsers";
import {PublicUser, User, UserInput} from "../types/User";
import {findUserAndIndexById, mapUserToPublic, validateUser, validateUserUpdate} from "../utils/usersUtils";


const router = Router();

//Get methods
// get all public users
router.get("/", (req: Request, res: Response <PublicUser[]>) => {
   const resUsers = users.map((user: User) => mapUserToPublic(user));
   res.status(200).json(resUsers);
});

//get public user by id
router.get("/:id", (req: Request<{ id: string }>, res: Response<PublicUser | {error: string}>) => {
   const id = req.params.id;
   const {user, index} = findUserAndIndexById(id);
   if (index ===-1) {return res.status(404).json({error: "User not found"})}
   const resUser = mapUserToPublic(user);
   res.status(200).json(resUser);
});

//get telegram link by userId
router.get("/telegram/:id", (req: Request<{ id: string }>, res: Response<{link: string} | {error: string}>) => {
    const id = req.params.id;
    const {user, index} = findUserAndIndexById(id);
    if (index ===-1) {return res.status(404).json({error: "User not found"})}
    const link = user.telegram;
    if (!link) {return res.status(404).json({error: "Telegram not available"})}
    res.status(200).json({link: link});
})

//add user
router.post("/", (req: Request <{}, {}, UserInput>,res: Response<User | {error: string}>) => {
  const userData = req.body;
   const newUser = {
      userId: "",
      name: userData.name,
      birthDate: userData.birthDate,
      sex: userData.sex,
      email: userData.email,
      telegram: userData.telegram,
      avatarUrl: userData.avatarUrl,
      cityId: userData.cityId,
      aboutMe: userData.aboutMe,
      favoriteBookIds: [],
      createdAt: Date.now().toString(),
      updatedAt: "",
      passwordHash: ""
   };
   const validationError = validateUser(newUser);
   if (validationError) {
     return res.status(400).json({ error: validationError });
   }
   const generateId = (length: number = 8): string => {
     return 'u' + Math.random().toString(36).substring(2, 2 + length);
   };
   newUser.userId = generateId();
   users.push(newUser);
   res.status(201).json(newUser);
});

//edit user
router.put("/:id", (req: Request<{ id: string }, {}, UserInput>, res: Response<User | {error: string}>) => {
   const id = req.params.id;
   const {user, index} = findUserAndIndexById(id);
   if (index ===-1) {return res.status(404).json({error: "User not found"})}
   const userUpdateData = req.body;
   const updateUser = {...user, ...userUpdateData, updatedAt: Date.now().toString()};
   const validationError = validateUserUpdate(req.body);
   if (validationError) {
     return res.status(400).json({ error: validationError });
   }
   users[index] = updateUser;
   res.status(200).json(updateUser);
});

//delete user
router.delete("/:id", (req: Request<{ id: string }, {}, User>, res: Response<string | {error: string}>) => {
   const userId = req.params.id;
   if (!userId || typeof userId !== "string") {
     return res.status(400).json({ error: "Invalid user ID" });
   }
   const { index } = findUserAndIndexById(userId);
   if (index === -1) {
     return res.status(404).json({ error: "User not found" });
   }
   users.splice(index, 1);
   res.status(200).json(`User with id ${userId} deleted`);
});


export default router;
