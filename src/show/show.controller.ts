import { Body, Controller, Post } from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';

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
}
