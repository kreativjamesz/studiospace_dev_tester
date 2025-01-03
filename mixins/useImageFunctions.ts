import type { ClientEnt, SuperAdminEnt, agencyDto, agencyEnt, userEnt } from '@shared/*'
import { availableCountries } from '@/utils/constants/available-countries'
import type { UserTypes } from '@/types'
export default function useImageFunctions() {
  const getAssetIconUrl = (icon: string) => {
    return new URL(`/src/assets/img/flags/${icon}.svg`, import.meta.url).href
  }

  const getFlagImage = (country: string) => {
    if (country && availableCountries.includes(country)) {
      return getAssetIconUrl(`${country.toLowerCase()}`)
    } else {
      return new URL(`/src/assets/img/location-mark.svg`, import.meta.url).href
    }
  }

  const getCultureImage = (id: number) => {
    return new URL(`/src/assets/img/cultures/culture-${id}.svg`, import.meta.url).href
  }

  const getMediaURL = (image: string) => {
    if (import.meta.env.PROD) {
      return `${import.meta.env.VITE_S3_ENDPOINT}/${image}`
    } else {
      return `${import.meta.env.VITE_S3_ENDPOINT}/${import.meta.env.VITE_S3_BUCKET}/${image}`
    }
  }

  const getMediaType = (mimeType: string) => {
    return mimeType ? mimeType.split('/')[0] : ''
  }

  const getYoutubeVimeotype = (embedUrl: string) => {
    const youtubeRegex = /\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9_\-]+)/i
    const vimeoRegex = /\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i
    if (embedUrl.match(youtubeRegex)) {
      return 'youtube'
    } else if (embedUrl.match(vimeoRegex)) {
      return 'vimeo'
    } else {
      return false
    }
  }

  const getVimeoId = (embed: string) => {
    const match = /vimeo.*\/(\d+)/i.exec(embed)
    if (match) {
      return match[1]
    }
  }

  const getYoutubeId = (embed: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = embed.match(regExp)
    return match && match[7].length == 11 ? match[7] : false
  }

  const getEmbedThumbnail = (embedUrl: string) => {
    if (getYoutubeVimeotype(embedUrl) === 'vimeo') {
      return `https://vumbnail.com/${getVimeoId(embedUrl)}.jpg`
    }
    if (getYoutubeVimeotype(embedUrl) === 'youtube') {
      return `https://img.youtube.com/vi/${getYoutubeId(embedUrl)}/hqdefault.jpg`
    }
  }

  const getEmbedVideoUrl = (embedUrl: string) => {
    if (getYoutubeVimeotype(embedUrl) === 'vimeo') {
      return `https://player.vimeo.com/video/${getVimeoId(embedUrl)}`
    }
    if (getYoutubeVimeotype(embedUrl) === 'youtube') {
      return `https://www.youtube.com/embed/${getYoutubeId(embedUrl)}`
    }
  }

  const getAgencyImageFromType = (agency: agencyEnt.Agency, type: agencyDto.agencyFileTypes) => {
    const matchTypeIndex = agency.agencyDocument.findIndex((e) => e.documentType === type)
    if (matchTypeIndex !== -1) {
      return agency.agencyDocument[matchTypeIndex].document
    }
  }

  const getUserImage = (user: userEnt.User, type = 'profilePicture') => {
    if (user && user.userDocument) {
      const matchTypeIndex = user.userDocument.findIndex((e) => e.documentType === type)
      if (matchTypeIndex !== -1) {
        return user.userDocument[matchTypeIndex].document
      }
    }
  }

  const getSuperAdminImage = (admin: SuperAdminEnt.SuperAdmin, type = 'profilePicture') => {
    if (admin && admin.superAdminDocument) {
      const matchTypeIndex = admin.superAdminDocument.findIndex((e) => e.documentType === type)
      if (matchTypeIndex !== -1) {
        return admin.superAdminDocument[matchTypeIndex].document
      }
    }
  }
  return {
    getAssetIconUrl,
    getFlagImage,
    getMediaURL,
    getMediaType,
    getEmbedThumbnail,
    getCultureImage,
    getAgencyImageFromType,
    getUserImage,
    getYoutubeVimeotype,
    getVimeoId,
    getYoutubeId,
    getEmbedVideoUrl,
    getSuperAdminImage
  }
}
