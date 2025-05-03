import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Patch,
    Post,
    Query,
    SerializeOptions,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserResponse } from '../responses/user.response';
import { CreateUserRequest } from '../requests/create.user.request';
import { UpdateUserRequest } from '../requests/update.user.request';
import { GetUsersResponse } from '../responses/get.users.response';
import { GetPaginationRequest } from '../requests/get.pagination';
import { UserService } from '../services/user.service';

@Controller('salon')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/user/create')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'create user',
        type: UserResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: UserResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async createUser(@Body() createUserRequest: CreateUserRequest): Promise<UserResponse> {
        return await this.userService.createUser(createUserRequest);
    }

    @Get('/user/get')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'get user',
        type: UserResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: UserResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async getUser(@Query('id') id: number) {
        return await this.userService.getUserById(+id);
    }

    @Delete('/user/delete')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'delete user',
        type: Boolean,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: Boolean,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async deleteUser(@Query('id') id: number) {
        try {
            await this.userService.deleteUserById(+id);
            return true;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Patch('/user/update')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'update user',
        type: UserResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: UserResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async updateUser(@Body() updateUserRequest: UpdateUserRequest): Promise<UserResponse> {
        return await this.userService.updateUserById(updateUserRequest);
    }

    @Get('/user/all')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'get all users with pagination',
        type: GetUsersResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: GetUsersResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async getUsers(@Body() getPaginationRequest: GetPaginationRequest) {
        return await this.userService.getUsersWithPagination(
            getPaginationRequest.limit,
            getPaginationRequest.offset,
        );
    }
}
