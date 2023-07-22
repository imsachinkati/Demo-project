import { Request, Response, NextFunction } from 'express';
import manageUserService from '../../services/user/manage-user';

class ManageUser {
  constructor() {
    return {
      addUser: this.addUser.bind(this),
      updateUser: this.updateUser.bind(this),
      deleteUser: this.deleteUser.bind(this),
      listUsers: this.listUsers.bind(this),
      // Add other methods here...
    };
  }

  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const object = Object.assign({}, req.body);
      const result = await manageUserService.addUser(object);
      res.status(200).json({
        message: 'User added successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const object = Object.assign({}, req.body);
      const result = await manageUserService.updateUser(object);
      res.status(200).json({
        message: 'User updated successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId; // Assuming the user ID is part of the URL parameter
      await manageUserService.deleteUser(userId);
      res.status(200).json({
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const userList = await manageUserService.listUsers(req.query);
      res.status(200).json({
        message: 'List of users',
        data: userList,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ManageUser();
