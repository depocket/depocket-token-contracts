// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.4.22;

abstract contract BPContract{
  function protect( address sender, address receiver, uint256 amount ) external virtual;
}
