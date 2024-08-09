import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import TasksController from '#controllers/tasks_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Auth routes
router.post('/register', [AuthController, 'register']).as('auth.register')
router.post('/login', [AuthController, 'login']).as('auth.login')
router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
router.get('/me', [AuthController, 'me']).as('auth.me')

// Task routes
router.get('/tasks', [TasksController, 'get']).as('tasks.get').use(middleware.auth())
router.get('/tasks/:id', [TasksController, 'find']).as('tasks.find').use(middleware.auth())
router.post('/tasks', [TasksController, 'create']).as('tasks.create').use(middleware.auth())
router.put('/tasks/:id', [TasksController, 'update']).as('tasks.update').use(middleware.auth())
router.delete('/tasks/:id', [TasksController, 'delete']).as('tasks.delete').use(middleware.auth())
