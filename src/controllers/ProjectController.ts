import type { Request, Response } from "express"
import Project from "../models/Project"

export class ProjectController {

    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)

        //set a project manager
        project.manager = req.user.id

        try {
            await project.save()
            res.send('Proyecto creado correctamente')
        } catch (error) {
            console.error('Error al crear el proyecto:', error)
            res.status(500).json({ error: 'Hubo un error al procesar la solicitud' })
    
            //console.log(error)
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({
                $or: [
                    {manager: {$in: req.user.id}},
                    {team: {$in: req.user.id}}
                ]
            })
            return res.json(projects)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        try {
            const project = await Project.findById(req.project.id).populate('tasks')
            if(project.manager.toString() !== req.user.id.toString() && !project.team.includes(req.user.id)) {
                const error = new Error('Acción no válida')
                return res.status(401).json({error: error.message})
            }
            res.json(project)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        try {
            req.project.projectName = req.body.projectName
            req.project.clientName = req.body.clientName
            req.project.description = req.body.description
            await req.project.save()
            res.send('Proyecto Actualizado')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        try {
            await req.project.deleteOne()
            res.send('Proyecto Eliminado')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

}