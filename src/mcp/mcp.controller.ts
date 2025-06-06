// src/mcp/mcp.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { McpService } from './mcp.service';

@Controller('mcp')
export class McpController {
    constructor(private readonly mcpService: McpService) { }

    @Post('invoke')
    async handlePrompt(@Body() body: any) {
        return this.mcpService.handlePrompt(body);
    }

    @Get('tools')
    getTools() {
        return this.mcpService.getTools();
    }
}
