"use client"
import React, { useState, useRef, useCallback, useEffect } from "react";
import Search from "./search/Search";
import styles from "./sidebar.module.css";
import { BiSolidHomeCircle, BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoPeopleSharp, IoBookmark } from "react-icons/io5";
import { MdPayments, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaRecycle } from "react-icons/fa6";
import { useWindowSize } from "@/utils/getWindowResolution";
import { FiLogIn } from "react-icons/fi";
import Link from "next/link";
import { useUserContext } from "@/context/getUserInfo";
import { BiLogOutCircle } from "react-icons/bi";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion"

const Sidebar = () => {
  const { isAuthenticated, userInfo } = useUserContext();

  const { width } = useWindowSize();
  const isMobile = width <= 1100;
  const [position, setPosition] = useState({ y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef(null);
  const lastPosition = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMove = useCallback((e) => {
    if (!isDragging || !isMobile) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = clientY - lastPosition.current;
    lastPosition.current = clientY;
    setPosition(prevPosition => ({ y: prevPosition.y + delta }));
  }, [isDragging]);

  const handleStart = useCallback((e) => {
    setIsDragging(true);
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    lastPosition.current = clientY;
  }, []);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    sidebar.addEventListener("touchmove", handleMove, { passive: false });
    sidebar.addEventListener("touchend", handleEnd);
    sidebar.addEventListener("mousemove", handleMove);
    sidebar.addEventListener("mouseup", handleEnd);

    return () => {
      sidebar.removeEventListener("touchmove", handleMove);
      sidebar.removeEventListener("touchend", handleEnd);
      sidebar.removeEventListener("mousemove", handleMove);
      sidebar.removeEventListener("mouseup", handleEnd);
    };
  }, [handleMove, handleEnd]);


  return (
    <motion.div
      className={styles.sidebar}
      ref={sidebarRef}
      onTouchStart={handleStart}
      onMouseDown={handleStart}
      style={{
        transform: isMobile ? `translateY(${position.y === 0 ? '50%' : position.y}px)` : '',
        left: isMobile ? isMenuOpen ? null : '-96px' : null,
        animation: isMobile ? isMenuOpen ? 'open 0.5s ease-in-out' : 'close 0.5s ease-in-out' : ''
      }}
    >
      <div className={styles.logo}>
        <Link href="/">Whooper</Link>
      </div>
      <Search />
      <section className={styles.general}>
        <h3>General</h3>
        <ul>
          <li className={styles.active}><BiSolidHomeCircle /><span>Home</span></li>
          <li><IoPeopleSharp /><span>Collaborate</span></li>
          <li><BiSolidMessageSquareDetail /><span>Messages</span></li>
          <li><MdPayments /><span>Subscription</span></li>
          <li><IoBookmark /><span>Bookmark</span></li>
          <li><FaRecycle /><span>All community</span></li>
          <li>
            <Link href={isAuthenticated ? '/logout' : '/auth'}>
              {isAuthenticated ? <BiLogOutCircle /> : <FiLogIn />}
              <span>{isAuthenticated ? 'Logout' : 'Login'}</span>
            </Link>
          </li>

          {isAuthenticated ? <li className={styles.userImageSidebar}>
            <Link href="#">
              <Image src={userInfo?.photoURL} alt={userInfo?.displayName} width={40} height={40} />
            </Link>
          </li> : null}

        </ul>

        <div className={styles.closeopenicon} onClick={() => setIsMenuOpen(prev => !prev)}>
          {isMenuOpen ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
        </div>
      </section>
    </motion.div>
  );
};

export default Sidebar;
