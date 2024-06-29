export class ZodiacChineseYearDto {
  readonly timestamp: number; // in unix epoch timestamp
  readonly formatted: string;
}

export class ZodiacSignDto {
  readonly name: string;
  readonly description: string;
  readonly pros?: string;
  readonly cons?: string;
}

export class ZodiacElementDto {
  readonly name: string;
  readonly description: string;
}

export class ZodiacDto {
  readonly chineseYear?: ZodiacChineseYearDto;
  readonly sign: ZodiacSignDto;
  readonly element: ZodiacElementDto;
}
