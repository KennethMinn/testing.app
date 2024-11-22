import * as TablerIcons from '@tabler/icons-react';

export const getIcon = (title) => {
    if (title.toLowerCase().includes('refer')) {
      return 'IconUsers';
    }
  
    if (title.toLowerCase().includes('twitter')) {
      return 'IconBrandTwitter';
    }
  
    if (title.toLowerCase().includes('facebook')) {
      return 'IconBrandFacebook';
    }
  
    if (title.toLowerCase().includes('instagram')) {
      return 'IconBrandInstagram';
    }
  
    if (title.toLowerCase().includes('telegram')) {
      return 'IconBrandTelegram';
    }
  
    if (title.toLowerCase().includes('youtube')) {
      return 'IconBrandYoutube';
    }
  
    if (title.toLowerCase().includes('tiktok')) {
      return 'IconBrandTiktok';
    }
  
    return 'IconBrandTelegram';
  };

  export function isHttpsLink(url) {
    const pattern = /^https:\/\/[^\s$.?#].[^\s]*$/i;
    return pattern.test(url);
  }

  export const getIconComponent = (IconName) => {
    return TablerIcons[IconName];
  };
