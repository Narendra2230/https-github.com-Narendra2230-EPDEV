import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../services/side-menu/sidenav.service'
import { from } from 'rxjs';
import { NgClass } from '@angular/common';
import { url } from 'inspector';

const MENU_ICONS = [{
  "key": "Profile",
  "isUrl": false,
  "icon": "/assets/images/profile.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/profile-hover.svg"
},
{
  "key": "Time Management",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/time-mgmt.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/time-mgmt-hover.svg"
},
{
  "key": "Leave Management",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/Leave-Management.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/Leave-Management.svg"
},
{
  "key": "Policies",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/policies.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/policies.svg"
},
{
  "key": "Hire & Exit",
  "isUrl": false,
  "icon": "/assets/images/profile.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/profile-hover.svg"
},
{
  "key": "Reports",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/reports.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/reports.svg"
},
{
  "key": "Helpdesk",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/helpdesk.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/helpdesk-hover.svg"
}, {
  "key": "Associate",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/Associate.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/Associate_hover.svg"
},
{
  "key": "Performance Mgmt",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/perform-mgmt.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/perform-mgmt-hover.svg"
},
{
  "key": "Readers Hub",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/readers-hub.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/readers-hub-hover.svg"
},
{
  "key": "Org Chart",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/organization.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/organization-hover.svg"
},
{
  "key": "Talent Search",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/TalentSearch.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/TalentSearch_hover.svg"
},
{
  "key": "Resource Allocation",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/ResourceAllocation.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/ResourceAllocation.svg"
},
{
  "key": "News and Events",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/news-events.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/news-events-hover.svg"
},
{
  "key": "Activity Tracker",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/activity-tracker.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/activity-tracker-hover.svg"
},
{
  "key": "Task Tracker",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/Tasktracker.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/Tasktracker.svg"
},
{
  "key": "R & R",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/rr.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/rr-hover.svg"
},
{
  "key": "Pay Manage",
  "isUrl": false,
  "icon": "/assets/images/pay-manage.svg",
  "hover_icon": "/assets/images/pay-manage.svg"
},
{
  "key": "Manage Assets",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/Manage_Assets.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/Manage_Assets_hover.svg"
},
{
  "key": "Incident Management",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/Incident_Management.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/Incident_Management_hover.svg"
},
{
  "key": "Gross Margin Report",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/Gross_Margin_Report.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/Gross_Margin_Report_hover.svg"
},
{
  "key": "Conversation",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/Conversation.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/Conversation_hover.svg"
},
{
  "key": "Immigration",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/Immigration.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/Immigration_hover.svg"
},
{
  "key": "Administration",
  "isUrl": false,
  "icon": "/assets/images/leftnav_icons/Administration.svg",
  "hover_icon": "/assets/images/leftnav_icons/hover/Administration_hover.svg"
},
];

const staticMenu = [{
  "id": "1",
  "title": "Paymanage",
  "type": "group",
  "icon": "icon-user icon-large profile_icon",
  "children": [
      {
          "id": "150",
          "title": "Paymanage",
          "type": "item",
          "isExternalURL":true,
          "url": "https://paymanage.com/suneratech",
          "subchildren": []
      }
  ]
}];

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  public navData: any[];
  yy = true;
  constructor(private _sideNavedata: SidenavService) { }

  ngOnInit() {
    let data = this._sideNavedata.getUserRoles({}).subscribe(data => {
      let d = data['constadminNav'];
      d = [...d,...staticMenu];
      d.forEach(o => {
        let ic = MENU_ICONS.find(i => i.key === o.title) || {};
        let pic = ic['icon'] || '/assets/images/menu-btn.svg';
        let hpic = ic['hover_icon'] || '/assets/images/menu-btn.svg';
        o.menupic = pic;
        o.menuhpic = hpic;
      });
      this.navData =d;

    });


  }
  reDirectTo(data: any) {
    console.log(data);
  }

  resetMenu(d,i,isredirect=true) {
    if(isredirect){
      if(d.url===null){
        alert("thre is no url for this");
      }else{
       if(d.isExternalURL) window.open( d.url, '_blank').focus(); 
       else window.location.href="http://epstaging.suneratech.com/"+d.url;
      }
      
    }
    this.navData.forEach((m, index) => {
      if (index !== i)
        m.isOpen = false;

      m.children.forEach(s => {
        s.isOpen = false;
      })
    })
    this.navData = this.navData;
  }
  menucta(d, i) {
    //alert(d.sub_mnu);
    this.resetMenu(d,i,false);
    this.navData[i].isOpen = !this.navData[i].isOpen;
    this.navData = this.navData;
  }
  submenucta(d, si, i, ) {
    if (d.subchildren.length === 0) {
  //   window.location.href="https://ep.suneratech.com/"+d.url;
        if(d.isExternalURL) window.location.href= d.url; //window.open( d.url, '_blank').focus(); // 
        else window.location.href="http://epstaging.suneratech.com/"+d.url;
     
      return;

    }
    this.navData[i]['children'][si].isOpen = !this.navData[i]['children'][si].isOpen;
    this.navData = this.navData;
  }
}
