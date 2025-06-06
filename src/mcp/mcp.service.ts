import { Injectable } from '@nestjs/common';
import { TodoItemsService } from '../todo_items/todo_items.service';

@Injectable()
export class McpService {
    constructor(private readonly todoItemsService: TodoItemsService) { }

    async handlePrompt(body: any) {
        const { tool, parameters } = body;

        if (tool === 'create_todo_item') {
            const { listId, description } = parameters;
            return this.todoItemsService.createItemInList(Number(listId), { description });
        }

        if (tool === 'update_todo_item') {
            const { itemId, description } = parameters;
            return this.todoItemsService.updateItem(Number(itemId), { description });
        }

        if (tool === 'complete_todo_item') {
            const { itemId } = parameters;
            return this.todoItemsService.markItemAsComplete(Number(itemId));
        }

        if (tool === 'delete_todo_item') {
            const { itemId } = parameters;
            return this.todoItemsService.deleteItem(Number(itemId));
        }

        throw new Error('Tool not implemented');
    }

    getTools() {
        return [
            {
                name: 'create_todo_item',
                description: 'Crea un nuevo ítem en una lista existente',
                parameters: {
                    type: 'object',
                    properties: {
                        listId: {
                            type: 'integer',
                            description: 'ID de la lista en la que se agregará el ítem'
                        },
                        description: {
                            type: 'string',
                            description: 'Descripción del ítem'
                        }
                    },
                    required: ['listId', 'description']
                }
            },
            {
                name: 'update_todo_item',
                description: 'Actualiza la descripción de un ítem de tarea existente',
                parameters: {
                    type: 'object',
                    properties: {
                        itemId: {
                            type: 'integer',
                            description: 'ID del ítem a actualizar'
                        },
                        description: {
                            type: 'string',
                            description: 'Nueva descripción del ítem'
                        }
                    },
                    required: ['itemId', 'description']
                }
            },
            {
                name: 'complete_todo_item',
                description: 'Marca un ítem como completado',
                parameters: {
                    type: 'object',
                    properties: {
                        itemId: {
                            type: 'integer',
                            description: 'ID del ítem a marcar como completo'
                        }
                    },
                    required: ['itemId']
                }
            },
            {
                name: 'delete_todo_item',
                description: 'Elimina un ítem de tarea por su ID',
                parameters: {
                    type: 'object',
                    properties: {
                        itemId: {
                            type: 'integer',
                            description: 'ID del ítem a eliminar'
                        }
                    },
                    required: ['itemId']
                }
            }
        ];
    }
}
