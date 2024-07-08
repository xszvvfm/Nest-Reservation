import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { Category } from './types/showCategory.type';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  /** 공연 등록 **/
  @Post()
  async create(@Body() createShowDto: CreateShowDto) {
    const newShow = await this.showService.create(createShowDto);

    return {
      message: '공연 등록에 성공했습니다.',
      data: newShow,
    };
  }

  /** 공연 목록 조회 **/
  @Get()
  async findAll(@Query('category') category: Category) {
    const findShows = await this.showService.findAll(category);

    return {
      message: '공연 목록 조회에 성공했습니다.',
      data: findShows,
    };
  }

  /** 공연 상세 조회 **/
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const findShow = await this.showService.findOne(id);

    return {
      message: '공연 상세 조회에 성공했습니다.',
      data: findShow,
    };
  }
}
