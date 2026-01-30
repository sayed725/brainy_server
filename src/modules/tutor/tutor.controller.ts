import { UserRole } from '../../middlewares/auth';
import { tutorService } from './tutor.service';
import { NextFunction, Request, Response } from "express";


const addTutor = async(req: Request, res: Response, next: NextFunction ) => {
    // tutor add logic here 
    const user = req.user;

     if (!user) {
      throw new Error ("UnAuthorized Action")
    }
     const isAdmin = user.role === UserRole.ADMIN;

    try {
        // console.log(req.body);
        const result = await tutorService.addTutor(req.body, user?.id, isAdmin);
         res.status(201).json({
          success: true,
          message: "Tutor added successfully!",
          data: result,
        });
      } catch (error) {
       next(error);
      }

}

const getTutor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await tutorService.getTutor();
    res.status(200).json({
      success: true,
      message: "Tutors retrieved successfully!",
      data: result,
    });
  } catch (error) {
   next(error);
  }
};


const updateTutor = async(req: Request, res: Response, next: NextFunction ) => {
    // tutor add logic here 
    const user = req.user;
    
     if (!user) {
      throw new Error ("UnAuthorized Action")
    }

     const { tutorId } = req.params;
     const isAdmin = user.role === UserRole.ADMIN;

    try {
        // console.log(req.body);
        const result = await tutorService.updateTutor(tutorId as string ,req.body, user?.id, isAdmin);
         res.status(200).json({
          success: true,
          message: "Tutor Updated successfully!",
          data: result,
        });
      } catch (error) {
       next(error);
      }

}

const deleteTutor = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error ("UnAuthorized Action")
    }

    const isAdmin = user.role === UserRole.ADMIN;
    const { tutorId } = req.params;

    const result = await tutorService.deleteTutor(tutorId as string, user.id, isAdmin);

    res.status(200).json({
      success: true,
      message: "Tutor deleted successfully!",
      data: result,
    });

  } catch (error) {
   next(error)
  }
};



export const tutorController = {
  addTutor,
  getTutor,
  updateTutor,
  deleteTutor
};