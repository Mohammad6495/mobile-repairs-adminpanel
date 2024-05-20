/* eslint-disable react/jsx-no-target-blank */
import { useIntl } from 'react-intl'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'
import { useState } from 'react'
import { useAuth } from '../../../../app/modules/auth'
import { Button, Modal } from 'react-bootstrap'
import { BsCreditCard2Front } from 'react-icons/bs'
import { HiOutlineLogout, HiUserGroup } from 'react-icons/hi'
import { RxDashboard } from 'react-icons/rx'
import { MdOutlineMiscellaneousServices, MdProductionQuantityLimits } from 'react-icons/md'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { TbCategory, TbGitPullRequest } from "react-icons/tb";
import { MdOutlineCastForEducation } from "react-icons/md";
import { FaChalkboardTeacher, FaUniversity } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
export function AsideMenuMain() {
  const intl = useIntl()
  const { logout } = useAuth()
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false)
  const toggleLogoutModal = () => setShowLogoutModal((o) => !o)
  const handleLogout = () => logout()
  ////
  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        componentsIcon={<RxDashboard fontSize={20} className='me-2' />}
        title={'داشبورد'}
      />
      <AsideMenuItemWithSub title='دوره های آموزشی' componentsIcon={<MdOutlineCastForEducation  fontSize={20} className='me-2' />}>
        <AsideMenuItem
          to='/course-list'
          title={'لیست دوره ها'}
          hasBullet={true}
        />
        <AsideMenuItem to='/upsert-course' title='افزودن دوره جدید' hasBullet={true} />
      </AsideMenuItemWithSub>
      
      <AsideMenuItemWithSub title='دسته بندی' componentsIcon={<TbCategory fontSize={20} className='me-2' />}>
        <AsideMenuItem
          to='/category-list'
          title={'مدیریت دسته بندی'}
          hasBullet={true}
        />
      </AsideMenuItemWithSub>
      <div className='menu-item' onClick={toggleLogoutModal}>
        <div className={'menu-link without-sub'}>
          <HiOutlineLogout fontSize={20} className='me-2' />
          <span className='menu-title'>{'خروج'}</span>
        </div>
      </div>
      <Modal show={showLogoutModal} onHide={toggleLogoutModal}>
        <Modal.Header closeButton>
          <h3>آیا اطمینان دارید ؟</h3>
        </Modal.Header>
        <Modal.Footer>
          <Button variant='primary' type='button' onClick={handleLogout}>
            بلی
          </Button>
          <Button variant='danger' type='button' onClick={toggleLogoutModal}>
            خیر
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>
    </>
  )
}
