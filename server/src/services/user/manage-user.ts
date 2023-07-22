import { IUser } from '../../models/user.model'; 
import User from '../../models/user.model';


class ManageUserService {
  constructor() {
    return {
      addUser: this.addUser.bind(this),
      updateUser: this.updateUser.bind(this),
      deleteUser: this.deleteUser.bind(this),
      listUsers: this.listUsers.bind(this),
      // Add other methods here...
    };
  }

  async addUser({ name, email, age }: IUser): Promise<IUser> {
    try {
      const newUser: IUser = new User({ name, email, age });
      const savedUser: IUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser({ _id, name, email, age }: IUser): Promise<IUser | null> {
    try {
      const updatedUser: IUser | null = await User.findByIdAndUpdate(
        _id,
        { name, email, age },
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string): Promise<IUser | null> {
    try {
      const deletedUser: IUser | null = await User.findByIdAndRemove(id);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
  
  async listUsers({ name }: { name?: string }): Promise<IUser[]> {
    try {
      let condition: any = {};
      if (name) {
        // If name is provided in the query, sanitize it and include it in the condition
        name = name.replace(/[^A-Za-z0-9 ]/g, "");
        condition['name'] = { $regex: `.*${name}.*`, $options: 'i' };
      }
      const users: IUser[] = await User.find(condition);
      return users;
    } catch (error) {
      throw error;
    }
  }
  

  // Add other methods here...
}

export default new ManageUserService();
