import { lazy } from "react";
import {
  DashboardOutlined,
  EventNote,
  LocalOffer,
  PeopleOutlined,
} from "@material-ui/icons";
import Constants from "../config/constants";
import RouteName from "./Route.name";
import MasterList from "../views/master/MasterList/MasterList.view";
import AdminUserList from "../views/AdminUser/AdminUserList/AdminUserList.container";
import AppUserList from "../views/AppUsers/AppUserList/AppUserList.container";
import UserProfile from "../views/AppUserDetails/UserProfile/UserProfile.js";
import FeedPost from "../views/AppUserDetails/FeedsPost/FeedPost.js";
import CommentPost from "../views/AppUserDetails/CommentPost/CommentPost.js";
import AssociateEvent from "../views/AppUserDetails/AssociateEvent/AssociateEvent.js";
import AssociateChapter from "../views/AppUserDetails/AssociateChapter/AssociateChapter.js";
import MemberList from "../views/MemberList/MemberList.view";
import StateFedCreate from "../views/master/MasterList/StateFedCreate/StateFedCreate.view";
import NationalMemDetail from "../views/master/MasterList/NationalMemDetail/NationalMemDetail.view";
import CityAssocList from "../views/master/CityAssocList/CityAssocList.view";
import CityAssCreate from "../views/master/CityAssCreate/CityAssCreate.view";
import EventList from "../views/Events/EventList/EventList.view";
import EventCreate from "../views/Events/EventCreate/EventCreate.view";
import PendingEventList from "../views/PendingEvents/PendingEventList/PendingEventList.view";
import PendingEventDetail from "../views/PendingEvents/PendingEventDetail/PendingEventDetail.view";
import LeadMemberList from "../views/LeadMemberList/LeadMemberList.view";
import MemberCreate from "../views/MemberList/MemberCreate/MemberCreate.view";
import MemberDetail from "../views/MemberList/MemberDetail/MemberDetail.view";
import PolicieLists from "../views/Policies/PoliciesList/PoliciesListContainer";
import StateMemberDetail from "../views/master/StateMemberDetail/StateMemberDetail.view";
import CityMemDetail from "../views/master/CityMemDetail/CityMemDetail.view";
import EventDetail from "../views/Events/EventDetail/EventDetail.view";
import EventOrganiserList from "../views/EventOrganisingCommittee/List/EventOrganiserList";
import EventPollsList from "../views/EventPolls/EventPollsList/EventPollsList.container";
import EventPollsCreate from "../views/EventPolls/EventPollsCreate/EventPollsCreate.view";
import EventScheduleList from "../views/Events/EventSchedule/EventScheduleList/EventScheduleContainer";
import EventSpeaker_List from "../views/EventSpeakers/EventSpeaker_List/Speakers_List";
import SpeakerCreate from "../views/EventSpeakers/EventSpeakers_Create/SpeakersCreate";
import CityGuid_Create from "../views/EventCityGuide/Create/CityGuide_View";
import CityGuid_List from "../views/EventCityGuide/Lists/CityGuide_list";
import CityGuid_Content_List from "../views/EventCityGuide/CityGuideContent/List/CityGuideContent_List";
import Album_List from "../views/GalleryAlbum/List/Album_List";
import Album_Create from "../views/GalleryAlbum/Create/Album_Create";
import Album_Detail from "../views/GalleryAlbum/Gallery_Detail/List/GalleryDetail";
import EventOrganiserUserList from "../views/EventOrganisingCommittee/UsersList/EventOrganiserUserList";
import EventOrganiserUserCreateView from "../views/EventOrganisingCommittee/UsersCreate/EventOrganiserUserCreate.view";
import EventSponsor from "../views/EventSponsor/List/EventSponsor.view";
import EventSponsorCreate from "../views/EventSponsor/Create/EventSponsorCreate.view";
import TypeList from "../views/EventSponsor/TypeList/TypeList.view";
import TypeCreate from "../views/EventSponsor/TypeCreate/TypeCreate.view";
import EventBanner from "../views/EventBanner/List/EventBanner.view";
import EventBannerCreate from "../views/EventBanner/Create/EventBannerCreate.view";
import CityCompView from "../views/EventCityGuide/CityGuideContent/Create/CityComp.view";
import InforCenterLists from "../views/Event_InfoCenter/List/InfoCenter_List";
import InforCenter_Create from "../views/Event_InfoCenter/Create/InfoCenter_Create";
import YouTube_List from "../views/Event_YoutubeStreem/List/YouTube_List.js";
import YouTube_Create from "../views/Event_YoutubeStreem/Create/YouTube_Create";
import SplashScreen from "../views/Splashscreen/List/SplashScreen.js";
import SplashScreenCreate from "../views/Splashscreen/Create/SplashScreenCreate.js";
import SpeakerMaster from "../views/SpeakerMaster/List/SpeakerMaster.js";
import SpeakerMasterCreate from "../views/SpeakerMaster/Create/SpeakerMasterCreate.js";
import MenuGraphic from "../views/MenuGraphic/List/MenuGraphic.js";
import AwardList from "../views/Awards/Lists/AwardList.js";
import ReportedFeed from "../views/ReportedFeed/ReportedFeed.js";
import MeetingsCalendar from "../views/MeetingsCalendar/List/MeetingsCalendar.js";
import PrivilegeList from "../views/PrivilegeMember/Lists/PrivelegeList.js";
import CustomParticipantList from "../views/CustomParticipant/List/List.component.js";
import CustomParticipantView from "../views/CustomParticipant/Create/Create.component.js";


const MenuGraphicCreate = lazy(() =>
  import("../views/MenuGraphic/Create/MenuGraphicCreate")
);
const HallMasterList = lazy(() =>
  import("../views/HallMaster/Lists/HallMasterList")
);
const UserList = lazy(() =>
  import("../views/EventDesk/User/List/UserList.view")
);
const CategoryList = lazy(() =>
  import("../views/EventDesk/Category/List/CategoryList.view")
);
const EventUserCreateView = lazy(() =>
  import("../views/EventDesk/User/Create/EventUserCreate")
);
const CategoryCreateView = lazy(() =>
  import("../views/EventDesk/Category/Create/CategoryCreate.view")
);
const EventGallery = lazy(() =>
  import("../views/EventGallery/List/EventGallery.view")
);
const EventFeed = lazy(() => import("../views/EventFeed/List/EventFeed.view"));
const BusinessCreate = lazy(() =>
  import("../views/BusinessGreeting/BusinessCreate/BusinessCreate.view")
);
const BusinessDetail = lazy(() =>
  import("../views/BusinessGreeting/BusinessDetail/BusinessDetail.view")
);

const NotificationCreate = lazy(() =>
  import("../views/Notification/NotificationCreate/NotificationCreate.view")
);
const NotificationList = lazy(() =>
  import("../views/Notification/NotificationList/NotificationList.view")
);

const ProductGroupList = lazy(() =>
  import("../views/ProductGroup/List/List.component.js")
);
const ProductGroupView = lazy(() =>
  import("../views/ProductGroup/Create/Create.component.js")
);
const TestimonialList = lazy(() =>
  import("../views/Testimonials/List/TestimonialList.js")
);
const TestimonialCreate = lazy(() =>
  import("../views/Testimonials/Create/TestimonialCreate.js")
);

const NewDashboard = lazy(() => import("../views/dashboard/NewDashboard.view"));
const KnowledgeCenter = lazy(() =>
  import("../views/KnowledgeCenter/KnowledgeCenter.view")
);
const knowledgeCreate = lazy(() =>
  import("../views/KnowledgeCenter/Create/Create.view")
);
const knowledgeList = lazy(() =>
  import("../views/KnowledgeCenter/CountryList/List.view")
);
const knowledgeStampCreate = lazy(() =>
  import("../views/KnowledgeCenter/CountryList/CreateStamp/Stamp.js")
);
const ProductCategory = lazy(() =>
  import("../views/ProductCategory/List/List.component.js")
);
const ProductCategoryCreate = lazy(() =>
  import("../views/ProductCategory/Create/Create.component.js")
);
const ExhibitorList = lazy(() =>
  import("../views/Exhibitor/List/Exhibitor.js")
);
const ExhibitorCreate = lazy(() =>
  import("../views/Exhibitor/Create/Exhibitor.component.js")
);
const ExhibitionDetails = lazy(() =>
  import("../views/Exhibitor/List/Detail/ExhibitorDetail.js")
);

const AddCategoryData = lazy(() =>
  import("../views/AddCategory/AddCategory.component.js")
);
const AddCategoryList = lazy(() =>
  import("../views/AddCategory/List/List.module.js")
);
const ExhibitorQuery = lazy(() =>
  import("../views/ExhibitorQuery/ExhibitorQuery.module.js")
);
const CalendarCount = lazy(() =>
  import("../views/CalendarCount/CalendarCount.module.js")
);
const EventParticipants = lazy(() =>
  import("../views/EventParticipants/List/EventParticipantList.js")
);

const SponsporListView = lazy(() =>
  import("../views/SponsporVideo/SponsporList/List.js")
);

const VideoSponsporCreate = lazy(() =>
  import("../views/SponsporVideo/SponsporCreate/Create.js")
);

const EventHighLightsList = lazy(() =>
  import("../views/EventHighlights/EventHightList/List.js")
);

const EventHighLightCreate = lazy(() =>
  import("../views/EventHighlights/EventHighlightCreate/Create.js")
);

const MeetingRoomsList = lazy(() =>
  import("../views/MeetingRooms/MeetingList/MeetingList.js")
);
const MeetingDetails = lazy(() =>
  import("../views/MeetingRooms/MeetingDetails/MeetingDetails.js")
);

const MMaster = lazy(() =>
  import("../views/MeetingRooms/MMaster/MasterCreate.js")
);

const ParticipantType = lazy(()=>import("../views/ParticipantType/List/List.js"));

const ParticipantTypeCreate = lazy(()=>import("../views/ParticipantType/Create/ParticipantCreate.js"));

const Roles = Constants.ROLES;

const dashboardRoutes = [
  {
    path: "/",
    sidebarName: "Dashboard",
    navbarName: "Admin Dashboard",
    icon: DashboardOutlined,
    component: NewDashboard,
    is_sidebar: true,
  },
  {
    path: `${RouteName.USER_PROFILE + ":id"}`,
    component: UserProfile,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.APP}`,
  },
  {
    path: `${RouteName.FEED_POSTS + ":id"}`,
    component: FeedPost,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.APP}`,
  },
  {
    path: `${RouteName.COMMENTS}:id`,
    component: CommentPost,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.APP}`,
  },
  {
    path: `${RouteName.ASSOCIATED_EVENTS}:id`,
    component: AssociateEvent,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.APP}`,
  },
  {
    path: `${RouteName.ASSOCIATED_CHAPTERS}:id`,
    component: AssociateChapter,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.STATE_FEDERATION_CREATE}`,
    component: StateFedCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.STATE_FEDERATION_UPDATE}:id`,
    component: StateFedCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.NATIONAL_MEMBER_DETAIL}`,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.STATE_MEMBER_DETAIL}:id`,
    component: StateMemberDetail,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.CITY_MEMBER_DETAIL}:id`,
    component: CityMemDetail,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.CITY_ASSOCIATION_LIST}:id`,
    component: CityAssocList,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.CITY_ASSOCIATION_CREATE}`,
    icon: PeopleOutlined,
    component: CityAssCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.CITY_ASSOCIATION_UPDATE}:id`,
    component: CityAssCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.ADMIN}`,
    sidebarName: "Admin Users",
    navbarName: "Admin Users",
    icon: PeopleOutlined,
    component: AdminUserList,
    is_sidebar: true,
    is_protect: true,
    roles: [Roles.ADMIN],
  },
  {
    path: `${RouteName.APP}`,
    sidebarName: "App Users",
    navbarName: "App Users",
    icon: PeopleOutlined,
    component: AppUserList,
    is_sidebar: true,
    is_protect: true,
    roles: [Roles.ADMIN],
  },

  {
    path: `${RouteName.MEMBERS_CREATE}`,
    component: MemberCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.MEMBERS_UPDATE}:id`,
    component: MemberCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.MEMBERS_DETAILS}:id`,
    component: MemberDetail,
    is_sidebar: false,
    is_protect: true,
  },
  // {
  //   path: `${RouteName.NEW_MEMBERS}`,
  //   sidebarName: "Members Users Request",
  //   navbarName: "Members Users Request",
  //   icon: PeopleOutlined,
  //   component: LeadMemberList,
  //   is_sidebar: true,
  //   is_protect: true,
  //   roles: [Roles.GENERAL, Roles.CHAPTER_ADMIN],
  // },
  {
    path: `${RouteName.ALBUMS}`,
    sidebarName: "Gallery Album",
    navbarName: "Gallery Album",
    icon: PeopleOutlined,
    component: Album_List,
    is_sidebar: true,
    is_protect: true,
    roles: [Roles.ADMIN],
  },
  {
    path: `${RouteName.ALBUMS_CREATE}`,
    component: Album_Create,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.ALBUMS_DETAILS}:id`,
    component: Album_Detail,
    is_sidebar: false,
    is_protect: true,
  },
  // {
  //   path: `${RouteName.ALBUMS_UPDATE_CREATE}:id`,
  //   sidebarName: "Gallery Album",
  //   navbarName: "Gallery Album",
  //   icon: PeopleOutlined,
  //   component: "Album_CoDetail",
  //   is_sidebar: false,
  //   is_protect: true,
  // },
  {
    path: `${RouteName.ALBUMS_UPDATE}:id`,
    component: Album_Create,
    is_sidebar: false,
    is_protect: true,
  },
  // {
  //   path: `${RouteName.POLICIES}`,
  //   sidebarName: "Policies",
  //   navbarName: "Policies",
  //   icon: PeopleOutlined,
  //   component: PolicieLists,
  //   is_sidebar: true,
  //   is_protect: true,
  //   roles: [Roles.GENERAL, Roles.CHAPTER_ADMIN],
  // },
  {
    path: `${RouteName.NOTIFICATION}`,
    sidebarName: "App Notification",
    navbarName: "App Notification",
    icon: PeopleOutlined,
    component: NotificationList,
    is_sidebar: true,
    is_protect: true,
    roles: [Roles.ADMIN],
    should_regex: true,
  },
  {
    path: `${RouteName.NOTIFICATION_CREATE}`,
    component: NotificationCreate,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
  },
  {
    path: `${RouteName.NOTIFICATION_UPDATE}:id`,
    component: NotificationCreate,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
  },
  {
    path: `${RouteName.EVENTS}`,
    sidebarName: "Events",
    navbarName: "Events",
    icon: PeopleOutlined,
    component: EventList,
    is_sidebar: true,
    is_protect: true,
    roles: [Roles.ADMIN],
  },
  {
    path: RouteName.SPEAKERS_MASTER,
    sidebarName: "Speakers Master",
    navbarName: "Speakers Master",
    icon: PeopleOutlined,
    component: SpeakerMaster,
    is_sidebar: true,
    is_protect: true,
  },
  // {
  //   path: `${RouteName.EVENTS_SPEAKERS_LIST}`,
  //   sidebarName: "Speakers ",
  //   navbarName: "Speakers ",
  //   icon: PeopleOutlined,
  //   component: EventSpeaker_List,
  //   is_sidebar: true,
  //   is_protect: true,
  // },
  {
    // path: `${RouteName.SPEAKERS_LIST}`,
    path: `${RouteName?.EVENT_PARTICIPANTS}:id`,
    component: EventParticipants,
    icon: PeopleOutlined,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
 
  {
    path: `${RouteName.MENU_GRAPHIC}:id`,

    component: MenuGraphic,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: RouteName.MENU_GRAPHIC_CREATE,

    component: MenuGraphicCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.MENU_GRAPHIC_UPDATE}:id`,

    component: MenuGraphicCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.SPEAKERS_MASTER_UPDATE}:id`,
    sidebarName: "Speakers Master",
    navbarName: "Speakers Master",
    icon: PeopleOutlined,
    component: SpeakerMasterCreate,
    is_sidebar: false,
    is_protect: true,
    // parentRoute:`${RouteName.EVENTS}`
  },

  {
    path: `${RouteName.SPEAKERS_MASTER_CREATE}`,
    sidebarName: "Speakers Master",
    navbarName: "Speakers Master",
    icon: PeopleOutlined,
    component: SpeakerMasterCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_TESTIMONIAL}:id`,
    component: TestimonialList,
    is_protect: true,
    is_sidebar: false,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.EVENTS_SCEDULE}:id`,
    component: EventScheduleList,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.ADD_SPEAKERS_CREATE}`,
    component: SpeakerCreate,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.ADD_SPEAKERS_UPDATE}:id`,
    component: SpeakerCreate,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  // {
  //   path: `${RouteName.EVENTS_SPEAKERS_LIST}:id`,
  //   component: EventSpeaker_List,
  //   is_sidebar: false,
  //   is_protect: true,
  //   parentRoute:`${RouteName.EVENTS}`
  // },

  {
    path: `${RouteName.EVENT_CITYGUIDE}:id`,
    component: CityGuid_List,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.EVENT_CITYGUIDE_CREATE}`,
    component: CityGuid_Create,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.EVENT_CITYGUIDE_UPDATE}:id`,
    component: CityGuid_Create,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.CITYGUIDE_CONTENT_LIST}:id`,
    component: CityGuid_Content_List,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.CITYGUIDE_CONTENT_CREATE}`,
    component: CityCompView,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.CITYGUIDE_CONTENT_UPDATE}:id`,
    component: CityCompView,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.INFOR_CENTER}:id`, // :id
    component: InforCenterLists,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.INFOR_CENTER_CREATE}`,
    component: InforCenter_Create,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.INFOR_CENTER_UPDATE}:id`,
    component: InforCenter_Create,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },

  {
    path: `${RouteName.EVENTS_CREATE}`,
    component: EventCreate,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.EVENTS_UPDATE}:id`,
    component: EventCreate,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.EVENTS_DETAILS}:id`,
    component: EventDetail,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },

  {
    path: `${RouteName.EVENTS_SPEAKER_EVENT_LIST}:id`,
    component: EventSpeaker_List,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },

  // {
  //   path: `${RouteName.PENDING_EVENTS}`,
  //   sidebarName: "Pending Events Approval",
  //   navbarName: "Pending Events Approval",
  //   icon: PeopleOutlined,
  //   component: PendingEventList,
  //   is_sidebar: true,
  //   is_protect: true,
  //   roles: [Roles.GENERAL],
  // },

  {
    path: `${RouteName.PENDING_EVENTS_DETAILS}:id`,
    component: PendingEventDetail,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },

  {
    path: `${RouteName.PENDING_EVENTS_DETAILS}:id`,
    component: PendingEventDetail,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },

  // {
  //   path: `${RouteName.EVENT_PARTICIPANTS}:id`,
  //   component: EventParticipantList,
  //   is_sidebar: false,
  //   is_protect: true,
  // },

  {
    path: `${RouteName.EVENT_POLLS}:id`,
    component: EventPollsList,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.EVENT_POLLS_CREATE}`,
    component: EventPollsCreate,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.EVENT_POLLS_UPDATE}:id`,
    component: EventPollsCreate,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.EVENT_ORGANISER_USER_CREATE}`,
    component: EventOrganiserUserCreateView,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_ORGANISER_USER_UPDATE}:id`,
    component: EventOrganiserUserCreateView,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_ORGANISER_USER}:id`,
    component: EventOrganiserUserList,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_ORGANISERS}:id`,
    component: EventOrganiserList,
    is_sidebar: false,
    is_protect: true,
  },

  {
    path: `${RouteName.EVENT_SPONSOR_CREATE}`,
    component: EventSponsorCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_SPONSOR_UPDATE}:id`,
    component: EventSponsorCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_SPONSOR_TYPE_CREATE}`,
    component: TypeCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_SPONSOR_TYPE_UPDATE}:id`,
    component: TypeCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_SPONSOR_USER}:id`,
    component: EventOrganiserUserList,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_SPONSOR}:id`,
    component: EventSponsor,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_BANNER}:id`,
    component: EventBanner,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_SPONSOR_TYPE}:id`,
    component: TypeList,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_BANNER_CREATE}`,
    component: EventBannerCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_BANNER_UPDATE}:id`,
    component: EventBannerCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.YOUTUBE_STREEM}:id`,
    component: YouTube_List,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.YOUTUBE_STREEM_CREATE}`,
    component: YouTube_Create,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_DESK_USER}:id`,
    component: UserList,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_CATEGORY_USER}:id`,
    component: CategoryList,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_DESK_CREATE}`,
    component: EventUserCreateView,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_DESK_UPDATE}:id`,
    component: EventUserCreateView,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_CATEGORY_CREATE}`,
    component: CategoryCreateView,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_CATEGORY_UPDATE}:id`,
    component: CategoryCreateView,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_GALLERY}:id`,
    component: EventGallery,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENT_FEED}:id`,
    component: EventFeed,
    is_sidebar: false,
    is_protect: true,
  },
  // {
  //   path: `${RouteName.EVENT_USERLIST}`,
  //   sidebarName: "Event Users Request",
  //   navbarName: "Event Users Request",
  //   icon: PeopleOutlined,
  //   component: EventUserList,
  //   is_sidebar: true,
  //   is_protect: true,
  //   roles:[Roles.GENERAL,Roles.EVENT_MANAGER,Roles.CHAPTER_ADMIN]
  // },
  // {
  //   path: `${RouteName.REPORTED_USER}`,
  //   sidebarName: "Reported Users",
  //   navbarName: "Reported Users",
  //   icon: PeopleOutlined,
  //   component: ReportedList,
  //   is_sidebar: true,
  //   is_protect: true,
  //   roles:[Roles.GENERAL]
  // },
  {
    path: `${RouteName.REPORTED_FEED}`,
    sidebarName: "Reported Feed",
    navbarName: "Reported Feed",
    icon: PeopleOutlined,
    component: ReportedFeed,
    is_sidebar: true,
    is_protect: true,
    // roles:[Roles.GENERAL]
  },
  // {
  //   path: `${RouteName.BUSINESS_GREETING}`,
  //   sidebarName: "Business Greeting",
  //   navbarName: "Business Greeting",
  //   icon: PeopleOutlined,
  //   component: BusinessList,
  //   is_sidebar: true,
  //   is_protect: true,
  //   roles:[Roles.GENERAL]
  // },
  {
    path: `${RouteName.BUSINESS_GREETING_CREATE}`,
    component: BusinessCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.BUSINESS_GREETING}/:id`,
    component: BusinessCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.BUSINESS_GREETING_DETAIL}/:id`,
    component: BusinessDetail,
    is_sidebar: false,
    is_protect: true,
  },

  // {
  //   path: `${RouteName.KNOWLEDGE_CENTER}`,
  //   sidebarName: "Knowledge Center",
  //   navbarName: "Knowledge Center",
  //   icon: PeopleOutlined,
  //   component: KnowledgeCenter,
  //   is_sidebar: true,
  //   is_protect: true,
  //   roles:[Roles.GENERAL]
  // },
  {
    path: `${RouteName.KNOWLEDGE_CENTER_CREATE}`,
    component: knowledgeCreate,
    is_protect: true,
  },
  {
    path: `${RouteName.KNOWLEDGE_CENTER_UPDATE}/:id`,
    component: knowledgeCreate,
    is_protect: true,
  },
  {
    path: `${RouteName.KNOWLEDGE_CENTER_LIST}/:id`,
    component: knowledgeList,
    is_protect: true,
  },
  {
    path: `${RouteName.KNOWLEDGE_CENTER_STAMP_CREATE}`,
    component: knowledgeStampCreate,
    is_protect: true,
  },
  {
    path: `${RouteName.KNOWLEDGE_CENTER_STAMP_CREATE}/:id`,
    component: knowledgeStampCreate,
    is_protect: true,
  },
  // {
  //   path: `${RouteName.PRODUCT_GROUP}`,
  //   sidebarName: "Product Group",
  //   navbarName: "Product Group",
  //   icon: PeopleOutlined,
  //   component: ProductGroupList,
  //   is_sidebar: true,
  //   is_protect: true,
  //   roles: [Roles.ADMIN],
  // },
  {
    path: `${RouteName.PRODUCT_CATEGORY}`,
    sidebarName: "Product Category",
    navbarName: "Product Category",
    icon: PeopleOutlined,
    component: ProductCategory,
    is_sidebar: true,
    is_protect: true,
    roles: [Roles.ADMIN],
  },
  {
    path: `${RouteName.PRODUCT_CATEGORY_CREATE}`,
    icon: PeopleOutlined,
    component: ProductCategoryCreate,
    is_protect: true,
  },
  {
    path: `${RouteName.PRODUCT_CATEGORY_UPDATE}:id`,
    icon: PeopleOutlined,
    component: ProductCategoryCreate,
    is_protect: true,
  },
  // {
  //   path: `${RouteName.PRODUCT_GROUP}`,
  //   sidebarName: "Product Group",
  //   navbarName: "Product Group",
  //   icon: PeopleOutlined,
  //   component: ProductGroupList,
  //   is_sidebar: true,
  //   is_protect: true,
  // },
  {
    path: `${RouteName.PRODUCT_GROUP_CREATE}`,
    icon: PeopleOutlined,
    component: ProductGroupView,
    is_protect: true,
  },
  {
    path: `${RouteName.PRODUCT_GROUP_UPDATE}:id`,
    icon: PeopleOutlined,
    component: ProductGroupView,
    is_protect: true,
  },
  // {
  //   path: `${RouteName.TESTIMONIAL}`,
  //   icon: PeopleOutlined,
  //   sidebarName: "Testimonial",
  //   navbarName: "Testimonial",
  //   component: TestimonialList,
  //   is_protect: true,
  //   is_sidebar: true,
  // },
  {
    path: `${RouteName.TESTIMONIAL_CREATE}`,
    icon: PeopleOutlined,
    component: TestimonialCreate,
    is_protect: true,
  },
  {
    path: `${RouteName.TESTIMONIAL_UPDATE}:id`,
    icon: PeopleOutlined,
    component: TestimonialCreate,
    is_protect: true,
  },
  {
    path: `${RouteName.EXHIBITOR_LIST}`,
    component: ExhibitorList,
    sidebarName: "Exhibitor",
    navbarName: "Exhibitor",
    is_sidebar: false,
    icon: PeopleOutlined,
    is_protect: true,
  },
  {
    path: `${RouteName.EXHIBITOR_LIST}:id`,
    component: ExhibitorList,
    sidebarName: "Exhibitor",
    navbarName: "Exhibitor",
    is_sidebar: false,
    icon: PeopleOutlined,
    is_protect: true,
  },
  {
    path: `${RouteName.EXHIBITOR_CREATE}`,
    icon: PeopleOutlined,
    component: ExhibitorCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EXHIBITOR_UPDATE}:id`,
    icon: PeopleOutlined,
    component: ExhibitorCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EXHIBITOR_DETAILS}:id`,
    icon: PeopleOutlined,
    component: ExhibitionDetails,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: RouteName.CATEGORY_EVENT_ADD,
    component: AddCategoryData,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.CATEGORY_EVENT_ADD}:id`,
    component: AddCategoryData,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: RouteName.CATEGORY_LIST,
    component: AddCategoryList,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.EXHIBITOR_QUERY}:id`,
    component: ExhibitorQuery,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.CALENDAR_COUNT}:id`,
    component: CalendarCount,
    sidebarName: "Calendar Count",
    navbarName: "Calendar Count",
    is_sidebar: false,
    icon: PeopleOutlined,
    is_protect: true,
  },
  {
    path: `${RouteName.HALL_MASTER}:id`,
    component: HallMasterList,
    sidebarName: "Hall Master",
    navbarName: "Hall Master",
    is_sidebar: false,
    icon: PeopleOutlined,
    is_protect: true,
    parentRoute:`${RouteName.EVENTS}`
  },
  {
    path: `${RouteName.SPONSPOR_VIDEO}:id`,
    component: SponsporListView,
    icon: PeopleOutlined,
    is_protect: true,
  },
  {
    path: RouteName.SPLASH_SCREEN,
    component: SplashScreen,
    sidebarName: "Splash Screen",
    navbarName: "Splash Screen",
    is_sidebar: true,
    icon: PeopleOutlined,
    is_protect: true,
  },
  {
    path: RouteName.SPLASH_SCREEN_CREATE,
    component: SplashScreenCreate,
    sidebarName: "Splash Screen",
    navbarName: "Splash Screen",
    is_sidebar: false,
    icon: PeopleOutlined,
    is_protect: true,
  },
  {
    path: `${RouteName.SPLASH_SCREEN_UPDATE}:id`,
    component: SplashScreenCreate,
    sidebarName: "Splash Screen",
    navbarName: "Splash Screen",
    is_sidebar: false,
    icon: PeopleOutlined,
    is_protect: true,
  },
  {
    path: `${RouteName.AWARD}:id`,
    component: AwardList,
    // sidebarName: "Awards",
    // navbarName: "Awards",
    is_sidebar: false,

    is_protect: true,
  },
  {
    path: `${RouteName.SPONSPOR_VIDE_CREATE}`,
    component: VideoSponsporCreate,
    is_protect: true,
  },
  {
    path: `${RouteName.SPONSPOR_VIDEO_UPDATE}:id`,
    component: VideoSponsporCreate,
    is_protect: true,
  },
  {
    path: `${RouteName?.EVENT_HIGHLIGHTS}:id`,
    component: EventHighLightsList,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName?.EVENT_HIGHLIGHTS_CREATE}`,
    component: EventHighLightCreate,
    is_protect: true,
  },
  {
    path: `${RouteName?.EVENT_HIGHLIGHTS_UPDATE}:id`,
    component: EventHighLightCreate,
    is_protect: true,
  },
  {
    path: `${RouteName.MEETING_ROOMS}:id`,
    component: MeetingRoomsList,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.MEETING_CALENDAR}:id`,
    component: MeetingsCalendar,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.CUSTOM_PARTICIPANT}:id`,
    component: CustomParticipantList,
    is_sidebar: false,
    is_protect: true,

  },
  {
    path: `${RouteName.CUSTOM_PARTICIPANT_CREATE}`,
    component: CustomParticipantView,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.CUSTOM_PARTICIPANT_UPDATE}:id`,
    component: CustomParticipantView,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.MEETINGS_DETAIL}:id`,
    component: MeetingDetails,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.MASTER_CREATE}:id`,
    component: MMaster,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.PRIVILEGE_MEMBER}:id`,
    component: PrivilegeList,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.PARTICIPANT_TYPE}`,
    component: ParticipantType,
    is_sidebar: true,
    is_protect: true,
    sidebarName: "Paticipant Type",
    navbarName: "Paticipant Type",
    icon: PeopleOutlined,
  },
  {
    path: `${RouteName.PARTICIPANT_TYPE_CREATE}`,
    component: ParticipantTypeCreate,
    is_sidebar: false,
    is_protect: true,    
  },
  {
    path: `${RouteName.PARTICIPANT_TYPE_UPDATE}:id`,
    component: ParticipantTypeCreate,
    is_sidebar: false,
    is_protect: true,    
  },

  
];

export default dashboardRoutes;
